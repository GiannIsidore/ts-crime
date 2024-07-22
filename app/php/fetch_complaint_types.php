<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include the database connection file
include '../php/connection/connection.php';

// Create a new PDO instance using the existing connection
try {
    // Prepare and execute the SQL query
    $stmt = $conn->prepare("SELECT * FROM complaint_types");
    $stmt->execute();

    // Fetch all results
    $complaintTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return results as JSON
    echo json_encode(['success' => true, 'records' => $complaintTypes]);

} catch (PDOException $e) {
    // Handle errors
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>