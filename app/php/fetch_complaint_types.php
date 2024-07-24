<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include '../php/connection/connection.php';


try {

    $stmt = $conn->prepare("SELECT * FROM complaint_types");
    $stmt->execute();


    $complaintTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode(['success' => true, 'records' => $complaintTypes]);

} catch (PDOException $e) {

    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>