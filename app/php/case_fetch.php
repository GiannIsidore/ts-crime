<?php

include '../php/connection/connection.php';

function handlePDOError(PDOException $e) {
    file_put_contents('php_debug.log', "PDO Error: " . $e->getMessage() . "\n", FILE_APPEND);
    header("Content-Type: application/json");
    echo json_encode(array('success' => false, 'message' => 'PDO Error: ' . $e->getMessage()));
    exit();
}

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $query = "
            SELECT 
                c.status,
                c.case_id,
                c.complainant_id,
                c.respondent_id,
                c.place_of_occurrence,
                c.date_time_occurrence,
                ct.complaint_type_name AS complaint_type_name,
                c.complaint_details,
                c.resolution,
                cm.complainant_name AS complainant_name,
                rm.respondent_name
            FROM 
                cases c
            JOIN 
                complainant cm ON c.complainant_id = cm.complainant_id
            JOIN 
                respondent rm ON c.respondent_id = rm.respondent_id
            JOIN
                complaint_types ct ON c.complaint_type = ct.complaint_type_id
        ";

        $stmt = $conn->query($query);
        $cases = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $formattedCases = array();

        foreach ($cases as $case) {
            $formattedCase = array(
                'case_id' => $case['case_id'],
                'complainant' => $case['complainant_name'],
                'respondent' => $case['respondent_name'],
                'place_of_occurrence' => $case['place_of_occurrence'],
                'date_time_occurrence' => $case['date_time_occurrence'],
                'complaint_type' => $case['complaint_type_name'], 
                'complaint_details' => $case['complaint_details'],
                'resolution' => $case['resolution'],
                'status' => $case['status']
            );

            $formattedCases[] = $formattedCase;
        }

        $response = array(
            'success' => true,
            'message' => 'Cases fetched successfully',
            'cases' => $formattedCases
        );

        echo json_encode($response);

    } catch (PDOException $e) {
        handlePDOError($e);
    }

} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array('message' => 'Method Not Allowed'));
}
?>