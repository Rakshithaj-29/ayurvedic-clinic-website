<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 0);
require_once __DIR__ . '/db.php';
require_once dirname(__DIR__) . '/utils/mailer.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

header('Content-Type: application/json');

if ($action === 'register') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!isset($data->name) || !isset($data->email) || !isset($data->password)) {
        echo json_encode(['success' => false, 'message' => 'Missing fields']);
        exit;
    }

    $name = trim(htmlspecialchars($data->name));
    $email = strtolower(trim($data->email));
    
    // Simple validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    if (strlen($data->password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
        exit;
    }

    $password = password_hash($data->password, PASSWORD_DEFAULT);

    // Check if email exists
    $stmt = $conn->prepare("SELECT id, is_verified FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if($existingUser) {
        if ($existingUser['is_verified'] == 1) {
            echo json_encode(['success' => false, 'message' => 'Email already exists']);
            exit;
        } else {
            // User exists but not verified, we can reuse this record
            $user_id = $existingUser['id'];
            $stmt = $conn->prepare("UPDATE users SET name = ?, password = ? WHERE id = ?");
            $stmt->execute([$name, $password, $user_id]);
        }
    } else {
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, is_verified) VALUES (?, ?, ?, 0)");
        $stmt->execute([$name, $email, $password]);
        $user_id = $conn->lastInsertId();
    }

    // Generate OTP
    $otp = sprintf("%06d", mt_rand(1, 999999));
    $expiry = date('Y-m-d H:i:s', strtotime('+15 minutes'));

    $stmt = $conn->prepare("UPDATE users SET otp = ?, otp_expiry = ? WHERE id = ?");
    $stmt->execute([$otp, $expiry, $user_id]);

    // Send Email
    $subject = "Your Verification Code - Ayurveda Wellness";
    $body = "<h2>Welcome to Ayurveda Wellness!</h2>
             <p>Thank you for registering. Please use the following One-Time Password (OTP) to verify your account:</p>
             <h1 style='color: #2c7a7b; font-size: 32px;'>$otp</h1>
             <p>This code will expire in 15 minutes.</p>";
    
    $mailResult = sendEmail($email, $subject, $body);

    if ($mailResult['success']) {
        echo json_encode([
            'success' => true, 
            'message' => 'OTP sent to your email',
            'email' => $email,
            'requires_verification' => true
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send OTP email: ' . $mailResult['message']]);
    }
} 
elseif ($action === 'verify_otp') {
    $data = json_decode(file_get_contents("php://input"));
    $email = strtolower(trim($data->email ?? ''));
    $otp = trim($data->otp ?? '');
    $type = $data->type ?? 'registration';

    // DEBUG LOGGING
    $debugLog = __DIR__ . '/debug_auth.log';
    $logMsg = date('[Y-m-d H:i:s]') . " OTP Verification Attempt - Email: $email, OTP: $otp, Type: $type\n";
    file_put_contents($debugLog, $logMsg, FILE_APPEND);

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND otp = ?");
    $stmt->execute([$email, $otp]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $logMsg = date('[Y-m-d H:i:s]') . " User found. Expiry: " . $user['otp_expiry'] . " Current Time: " . date('Y-m-d H:i:s') . "\n";
        file_put_contents($debugLog, $logMsg, FILE_APPEND);
        if (strtotime($user['otp_expiry']) > time()) {
            // Valid
            file_put_contents($debugLog, date('[Y-m-d H:i:s]') . " OTP valid!\n", FILE_APPEND);
        } else {
            $user = null; // Mark as invalid/expired
            file_put_contents($debugLog, date('[Y-m-d H:i:s]') . " OTP Expired.\n", FILE_APPEND);
        }
    } else {
        file_put_contents($debugLog, date('[Y-m-d H:i:s]') . " No user found with matching Email and OTP.\n", FILE_APPEND);
    }

    if ($user) {
        if ($type === 'registration') {
            $update = $conn->prepare("UPDATE users SET is_verified = 1, otp = NULL, otp_expiry = NULL WHERE id = ?");
            $update->execute([$user['id']]);

            // Log user in
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['role'] = 'user';

            echo json_encode(['success' => true, 'message' => 'Verification successful', 'redirect' => 'homepage.html']);
        } else {
            // For forgot password, we just confirm it's valid, then they can reset
            // We'll keep the OTP for the reset step or use a token. 
            // Simple: return success, the frontend will then call reset_password with same OTP?
            // Actually better to return a temporary token or just trust the next step if we check OTP again.
            echo json_encode(['success' => true, 'message' => 'OTP verified']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid or expired OTP']);
    }
}
elseif ($action === 'forgot_password') {
    $data = json_decode(file_get_contents("php://input"));
    $email = strtolower(trim($data->email ?? ''));

    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $otp = sprintf("%06d", mt_rand(1, 999999));
        $expiry = date('Y-m-d H:i:s', strtotime('+15 minutes'));

        $stmt = $conn->prepare("UPDATE users SET otp = ?, otp_expiry = ? WHERE id = ?");
        $stmt->execute([$otp, $expiry, $user['id']]);

        $subject = "Password Reset OTP - Ayurveda Wellness";
        $body = "<h2>Password Reset Request</h2>
                 <p>You requested a password reset. Use the code below to proceed:</p>
                 <h1 style='color: #2c7a7b; font-size: 32px;'>$otp</h1>
                 <p>This code will expire in 15 minutes. If you didn't request this, please ignore this email.</p>";
        
        $mailResult = sendEmail($email, $subject, $body);
        if ($mailResult['success']) {
            echo json_encode(['success' => true, 'message' => 'OTP sent to your email']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to send email']);
        }
    } else {
        // Don't reveal if user exists for security? Usually yes, but for this demo:
        echo json_encode(['success' => false, 'message' => 'Email not found']);
    }
}
elseif ($action === 'reset_password') {
    $data = json_decode(file_get_contents("php://input"));
    $email = strtolower(trim($data->email ?? ''));
    $otp = trim($data->otp ?? '');
    $new_password = password_hash($data->password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND otp = ? AND otp_expiry > NOW()");
    $stmt->execute([$email, $otp]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $stmt = $conn->prepare("UPDATE users SET password = ?, otp = NULL, otp_expiry = NULL WHERE id = ?");
        if ($stmt->execute([$new_password, $user['id']])) {
            echo json_encode(['success' => true, 'message' => 'Password reset successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to reset password']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid or expired OTP']);
    }
}
elseif ($action === 'login') {
    $data = json_decode(file_get_contents("php://input"));
    $email_or_username = strtolower(trim($data->email ?? ''));
    $password = $data->password ?? '';

    if (empty($email_or_username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Email and Password are required']);
        exit;
    }

    $debugLog = __DIR__ . '/debug_auth.log';
    file_put_contents($debugLog, date('[Y-m-d H:i:s]') . " Login Attempt - Email/User: $email_or_username\n", FILE_APPEND);

    // Check Admins
    $stmt = $conn->prepare("SELECT * FROM admins WHERE email = ?");
    $stmt->execute([$email_or_username]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin && password_verify($password, $admin['password'])) {
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['role'] = 'admin';
        echo json_encode(['success' => true, 'role' => 'admin', 'redirect' => 'admin_dashboard.html']);
        exit;
    }

    // Check Users
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email_or_username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        if ($user['is_verified'] == 0) {
            // Resend OTP if not verified
            $otp = sprintf("%06d", mt_rand(1, 999999));
            $expiry = date('Y-m-d H:i:s', strtotime('+15 minutes'));
            $conn->prepare("UPDATE users SET otp = ?, otp_expiry = ? WHERE id = ?")->execute([$otp, $expiry, $user['id']]);
            
            sendEmail($user['email'], "Verify Your Account", "Your verification code is: <h1>$otp</h1>");

            echo json_encode([
                'success' => false, 
                'message' => 'Account not verified. A new OTP has been sent.',
                'requires_verification' => true,
                'email' => $user['email']
            ]);
            exit;
        }

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['role'] = 'user';

        echo json_encode([
            'success' => true, 
            'role' => 'user', 
            'redirect' => 'homepage.html', 
            'user' => ['name' => $user['name'], 'email' => $user['email']]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
}
elseif ($action === 'check_session') {
    if (isset($_SESSION['user_id'])) {
        echo json_encode(['loggedIn' => true, 'role' => 'user', 'name' => $_SESSION['user_name'], 'email' => $_SESSION['user_email'] ?? '']);
    } elseif (isset($_SESSION['admin_id'])) {
        echo json_encode(['loggedIn' => true, 'role' => 'admin']);
    } else {
        echo json_encode(['loggedIn' => false]);
    }
}
elseif ($action === 'logout') {
    session_destroy();
    echo json_encode(['success' => true]);
}
elseif ($action === 'resend_otp') {
    $data = json_decode(file_get_contents("php://input"));
    $email = strtolower(trim($data->email ?? ''));
    $type = $data->type ?? 'registration';

    if ($type === 'registration') {
        // Only resend OTP for unverified users
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND is_verified = 0");
    } else {
        // For forgot_password, user must exist and be verified
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    }
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $otp = sprintf("%06d", mt_rand(1, 999999));
        $expiry = date('Y-m-d H:i:s', strtotime('+15 minutes'));
        $conn->prepare("UPDATE users SET otp = ?, otp_expiry = ? WHERE id = ?")->execute([$otp, $expiry, $user['id']]);

        $subject = $type === 'registration' ? "Your Verification Code - Ayurveda Wellness" : "Password Reset OTP - Ayurveda Wellness";
        $body = $type === 'registration'
            ? "<h2>Resend: Your Verification Code</h2><p>Use the following OTP to verify your account:</p><h1 style='color:#2c7a7b;font-size:32px;'>$otp</h1><p>This code expires in 15 minutes.</p>"
            : "<h2>Password Reset OTP</h2><p>Use the following OTP to reset your password:</p><h1 style='color:#2c7a7b;font-size:32px;'>$otp</h1><p>This code expires in 15 minutes.</p>";

        $mailResult = sendEmail($email, $subject, $body);
        if ($mailResult['success']) {
            echo json_encode(['success' => true, 'message' => 'A new OTP has been sent to your email']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to send OTP: ' . $mailResult['message']]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found or already verified']);
    }
}
elseif ($action === 'google_login') {
    $data = json_decode(file_get_contents("php://input"));
    $credential = $data->credential ?? '';
    if (empty($credential)) { echo json_encode(['success' => false, 'message' => 'Credential missing']); exit; }
    $url = "https://oauth2.googleapis.com/tokeninfo?id_token=" . $credential;
    $response = @file_get_contents($url);
    if ($response === false) { echo json_encode(['success' => false, 'message' => 'Failed to verify token']); exit; }
    $payload = json_decode($response, true);
    $client_id = getenv('GOOGLE_CLIENT_ID');
    if ($payload['aud'] !== $client_id) { echo json_encode(['success' => false, 'message' => 'Invalid audience']); exit; }
    $email = $payload['email'];
    $name = $payload['name'];
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) {
        $dummy_password = password_hash(bin2hex(random_bytes(16)), PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, is_verified) VALUES (?, ?, ?, 1)");
        $stmt->execute([$name, $email, $dummy_password]);
        $user = ['id' => $conn->lastInsertId(), 'name' => $name, 'email' => $email];
    } elseif ($user['is_verified'] == 0) {
        $conn->prepare("UPDATE users SET is_verified = 1 WHERE id = ?")->execute([$user['id']]);
    }
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['role'] = 'user';
    echo json_encode(['success' => true, 'role' => 'user', 'redirect' => 'homepage.html', 'user' => ['name' => $user['name'], 'email' => $user['email']]]);
}
