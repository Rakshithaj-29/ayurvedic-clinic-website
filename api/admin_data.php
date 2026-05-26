<?php
session_start();
include 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['admin_id'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$action = $_GET['action'] ?? '';

if ($action === 'stats') {
    $response = [
        'recentBookings' => [],
        'recentOrders' => [],
        'stats' => [
            'total_bookings' => 0,
            'total_orders' => 0,
            'orders' => 0,
            'pending_bookings' => 0
        ]
    ];

    // Stats
    try {
        $response['stats']['total_bookings'] = $conn->query("SELECT COUNT(*) FROM bookings")->fetchColumn();
        $response['stats']['total_orders'] = $conn->query("SELECT COUNT(*) FROM orders")->fetchColumn();
        $response['stats']['orders'] = $conn->query("SELECT COUNT(*) FROM orders WHERE `status`='pending'")->fetchColumn();
        $response['stats']['pending_bookings'] = $conn->query("SELECT COUNT(*) FROM bookings WHERE `status`='pending'")->fetchColumn();
    } catch (PDOException $e) { error_log("Stats Error: " . $e->getMessage()); }
    


    // Bookings (Show ALL)
    try {
        // We try with status first
        $bookingsStmt = $conn->query("SELECT id, inquiry_type, inquiry_details, first_name, last_name, email, phone, preferred_date, preferred_time, health_concerns, experienced_ayurveda, previous_consultation_details, newsletter_opt_in, created_at, `status` FROM bookings ORDER BY created_at DESC");
        if ($bookingsStmt) {
            $response['recentBookings'] = $bookingsStmt->fetchAll(PDO::FETCH_ASSOC);
        }
    } catch (PDOException $e) { 
        // Fallback for missing status column
        error_log("Bookings Status Error, attempting fallback: " . $e->getMessage());
        try {
            $bookingsStmt = $conn->query("SELECT id, inquiry_type, first_name, last_name, email, phone, preferred_date, preferred_time, health_concerns, experienced_ayurveda, previous_consultation_details, newsletter_opt_in, created_at FROM bookings ORDER BY created_at DESC");
            if ($bookingsStmt) {
                $response['recentBookings'] = $bookingsStmt->fetchAll(PDO::FETCH_ASSOC);
            }
        } catch (PDOException $e2) {
            error_log("Bookings Fallback Error: " . $e2->getMessage());
        }
    }
    
    // Orders
    try {
        $ordersStmt = $conn->query("SELECT id, customer_name, customer_email, customer_phone, package_name, price, status, health_concerns, experienced_ayurveda, previous_consultation_details, created_at FROM orders ORDER BY created_at DESC");
        if ($ordersStmt) {
             $response['recentOrders'] = $ordersStmt->fetchAll(PDO::FETCH_ASSOC);
        }
    } catch (PDOException $e) { error_log("Orders Error: " . $e->getMessage()); }

    echo json_encode($response);
} elseif ($action === 'delete_booking') {
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'Missing ID']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM bookings WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Deletion failed']);
    }
} elseif ($action === 'delete_order') {
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'Missing ID']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM orders WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Deletion failed']);
    }
}
?>
