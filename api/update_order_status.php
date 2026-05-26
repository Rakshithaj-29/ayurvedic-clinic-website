<?php
session_start();
require_once 'db.php';
require_once '../utils/mailer.php';
header('Content-Type: application/json');

// Check if admin is logged in
if (!isset($_SESSION['admin_id'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$status = $data['status'] ?? null;

// Validate inputs
if (!$id || !$status) {
    echo json_encode(['success' => false, 'message' => 'Missing required parameters']);
    exit;
}

// Validate status value
if (!in_array($status, ['pending', 'confirmed', 'completed'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid status value']);
    exit;
}

try {
    // Get user email and package name before updating
    $stmt = $conn->prepare("SELECT o.package_name, u.email, u.name 
                            FROM orders o 
                            JOIN users u ON o.user_id = u.id 
                            WHERE o.id = ?");
    $stmt->execute([$id]);
    $orderData = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$orderData) {
        echo json_encode(['success' => false, 'message' => 'Order not found']);
        exit;
    }

    // Update order status
    $stmt = $conn->prepare("UPDATE orders SET `status` = ? WHERE id = ?");
    $result = $stmt->execute([$status, $id]);
    
    if ($result) {
        // Send notification email
        $subject = "Update on your order: " . $orderData['package_name'];
        $status_label = ucfirst($status);
        $color = ($status === 'completed') ? '#38a169' : '#d69e2e';
        
        $body = "<h2>Hello " . htmlspecialchars($orderData['name']) . "!</h2>
                 <p>The status of your order for <strong>" . htmlspecialchars($orderData['package_name']) . "</strong> has been updated to:</p>
                 <h2 style='color: $color;'>$status_label</h2>
                 <p>Thank you for choosing Ayurveda Wellness.</p>";
        
        sendEmail($orderData['email'], $subject, $body);

        echo json_encode([
            'success' => true, 
            'message' => 'Order status updated and notification sent',
            'new_status' => $status
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update order status']);
    }
} catch (PDOException $e) {
    error_log("Update Order Status Error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'DB Error: ' . $e->getMessage()]);
}
?>
