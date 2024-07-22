<?php
include '../php/connection/connection.php';

// Set headers
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

try {
    // SQL query to fetch data from residents table only
    $query = "
        SELECT 
            id AS resident_id,
            first_name AS resident_fname,
            middle_name AS resident_mname,
            last_name AS resident_lname,
            suffix AS resident_suffix
        FROM 
            residents
    ";

    // Execute the query
    $stmt = $conn->query($query);
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Format the records
    $formattedRecords = [];
    foreach ($records as $record) {
        $formattedRecord = [
            'resident_id' => $record['resident_id'],
            'resident_name' => $record['resident_fname'] . " " . $record['resident_mname'] . " " . $record['resident_lname'] . " " . $record['resident_suffix']
        ];

        $formattedRecords[] = $formattedRecord;
    }

    // Prepare the response
    $response = [
        'success' => true,
        'message' => 'Records fetched successfully',
        'records' => $formattedRecords
    ];

    // Output JSON response
    echo json_encode($response);

} catch (PDOException $e) {
    // Handle any errors
    $response = [
        'success' => false,
        'message' => 'Error fetching data',
        'error' => $e->getMessage()
    ];
    echo json_encode($response);
}
?>