<?php
include '../php/connection/connection.php';



header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$data = json_decode(file_get_contents("php://input"), true);
$case_id = $data['case_id'] ?? null;
$status = $data['status'] ?? null;


error_log("Received data: " . json_encode($data));


if ($case_id === null || $status === null) {
    echo json_encode(['error' => 'Invalid input']);
    exit();
}

try {

    $sql = "UPDATE cases SET status = :status WHERE case_id = :case_id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['status' => $status, 'case_id' => $case_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['message' => 'Status updated successfully']);
    } else {
        echo json_encode(['error' => 'No rows affected']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>