<?php
session_start();
include 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if user is logged in
    if (!isset($_SESSION['user_id']) && !isset($_SESSION['admin_id'])) {
        echo json_encode(['success' => false, 'message' => 'Please login to book an appointment']);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"));
    
    if(!$data) {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
        exit;
    }

    $inquiry_type = htmlspecialchars($data->inquiryType ?? 'General');
    $inquiry_details = htmlspecialchars($data->inquiry_details ?? '');
    $first_name = htmlspecialchars($data->firstName ?? '');
    $last_name = htmlspecialchars($data->lastName ?? '');
    $email = htmlspecialchars($data->email ?? '');
    $phone = htmlspecialchars($data->phone ?? '');
    $preferred_date = htmlspecialchars($data->preferredDate ?? '');
    $preferred_time = htmlspecialchars($data->preferredTime ?? '');
    $health_concerns = htmlspecialchars($data->healthConcerns ?? '');
    $experienced_ayurveda = htmlspecialchars($data->experience ?? 'no');
    $prev_consultation_details = htmlspecialchars($data->prevConsultationDetails ?? '');
    
    // Simple validation
    if (empty($first_name) || empty($email) || empty($phone) || empty($preferred_date) || empty($preferred_time)) {
        echo json_encode(['success' => false, 'message' => 'Required fields missing']);
        exit;
    }

    // Check session limits (max 10 per date/time slot)
    $stmtLimit = $conn->prepare("SELECT COUNT(*) FROM bookings WHERE preferred_date = ? AND preferred_time = ?");
    $stmtLimit->execute([$preferred_date, $preferred_time]);
    $count = $stmtLimit->fetchColumn();

    if ($count >= 10) {
        echo json_encode(['success' => false, 'message' => 'The selected session is full. Please come in the next batch.']);
        exit;
    }

    $sql = "INSERT INTO bookings (inquiry_type, inquiry_details, first_name, last_name, email, phone, preferred_date, preferred_time, health_concerns, experienced_ayurveda, previous_consultation_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if($stmt->execute([$inquiry_type, $inquiry_details, $first_name, $last_name, $email, $phone, $preferred_date, $preferred_time, $health_concerns, $experienced_ayurveda, $prev_consultation_details])) {
        echo json_encode(['success' => true, 'message' => 'Booking request sent successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save booking']);
    }
}
?>
