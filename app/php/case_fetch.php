<?php
include '../php/connection/connection.php';
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Method: GET, POST, OPTIONS");
header("Access-Control-Allow-Method: Content-Type, Authorization");

try {
    $query = "
        SELECT 
            c.status,
            c.case_id,
            c.complainant_id,
            c.respondent_id,
            c.place_of_occurrence,
            c.date_time_occurrence,
            c.complaint_type,
            c.complaint_details,
            cm.fname AS complainant_fname,
            cm.mname AS complainant_mname,
            cm.lname AS complainant_lname,
            rm.respondent_name
        FROM 
            cases_tbl c
        JOIN 
            complainants_tbl cm ON c.complainant_id = cm.complainants_id
        JOIN 
            respondents_tbl rm ON c.respondent_id = rm.respondent_id;
    ";

    $stmt = $conn->query($query);
    $cases = $stmt->fetchAll(PDO::FETCH_ASSOC);

   foreach ($cases as $case) {
        $formattedCase = array(
            'case_id' => $case['case_id'],
            'complainant' => $case['complainant_fname'] . " " . $case['complainant_mname'] . " " . $case['complainant_lname'],
            'respondent' => $case['respondent_name'],
            'place_of_occurrence' => $case['place_of_occurrence'],
            'date_time_occurrence' => $case['date_time_occurrence'],
            'complaint_type' => $case['complaint_type'],
            'complaint_details' => $case['complaint_details'],
            'status' => $case['status']
        );

        $formattedCases[] = $formattedCase;
    }
    $response = array(
        'success' => true,
        'message' => 'Cases fetched successfully',
        'cases' => $formattedCases
    );

    // Output JSON
    header('Content-Type: application/json');
    echo json_encode($response);

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>