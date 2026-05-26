<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    $user_id = $_SESSION['user_id'];
    $package_name = htmlspecialchars($data->package_name);
    $price = $data->price;
    $customer_name = htmlspecialchars($data->customer_name ?? '');
    $customer_email = htmlspecialchars($data->customer_email ?? '');
    $customer_phone = htmlspecialchars($data->customer_phone ?? '');
    $health_concerns = htmlspecialchars($data->health_concerns ?? '');
    $experienced_ayurveda = htmlspecialchars($data->experienced_ayurveda ?? 'no');
    $previous_consultation_details = htmlspecialchars($data->previous_consultation_details ?? '');

    $stmt = $conn->prepare("INSERT INTO orders (user_id, customer_name, customer_email, customer_phone, package_name, price, status, health_concerns, experienced_ayurveda, previous_consultation_details) VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)");
    
    if($stmt->execute([$user_id, $customer_name, $customer_email, $customer_phone, $package_name, $price, $health_concerns, $experienced_ayurveda, $previous_consultation_details])) {
        echo json_encode(['success' => true, 'message' => 'Order placed successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to place order']);
    }
}
?>
