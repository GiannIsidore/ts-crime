<?php
include '../php/connection/connection.php';

// Set headers
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

try {
    // SQL query to fetch data from residents and outsiders tables
    $query = "
        SELECT 
            r.id AS resident_id,
            r.first_name AS resident_fname,
            r.middle_name AS resident_mname,
            r.last_name AS resident_lname,
            r.suffix AS resident_suffix,
            o.id AS outsider_id,
            o.first_name AS outsider_fname,
            o.middle_name AS outsider_mname,
            o.last_name AS outsider_lname,
            o.suffix AS outsider_suffix
        FROM 
            residents r
        LEFT JOIN 
            outsiders o ON r.id = o.id;  // Adjust JOIN condition if necessary
    ";

    // Execute the query
    $stmt = $conn->query($query);
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Format the records
    $formattedRecords = [];
    foreach ($records as $record) {
        $formattedRecord = [
            'resident_id' => $record['resident_id'],
            'resident_name' => $record['resident_fname'] . " " . $record['resident_mname'] . " " . $record['resident_lname'] . " " . $record['resident_suffix'],
            'outsider_id' => $record['outsider_id'],
            'outsider_name' => $record['outsider_fname'] . " " . $record['outsider_mname'] . " " . $record['outsider_lname'] . " " . $record['outsider_suffix']
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