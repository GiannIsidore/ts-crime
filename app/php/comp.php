<?php

include '../php/connection/connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
function handlePDOError(PDOException $e) {
    header("Content-Type: application/json");
    echo json_encode(array('success' => false, 'message' => 'PDO Error: ' . $e->getMessage()));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header("Content-Type: application/json");

    $content = trim(file_get_contents("php://input"));
    $requestData = json_decode($content, true);
    error_log('Received data:');
error_log(print_r($data, true));
    if (!$requestData) {
        http_response_code(400);
        echo json_encode(array('success' => false, 'message' => 'Invalid JSON data'));
        exit();
    }

    // Check if 'data' key is present
    if (!isset($requestData['data'])) {
        http_response_code(400);
        echo json_encode(array('success' => false, 'message' => 'Missing data object'));
        exit();
    }

    $data = $requestData['data'];

    // Check required fields
    $requiredFields = ['fname', 'mname', 'lname', 'email', 'number', 'address', 'respondent', 'complaint_type', 'complaint_details'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            http_response_code(400);
            echo json_encode(array('success' => false, 'message' => 'Missing or empty required field: ' . $field));
            exit();
        }
    }

    // Prepare data for insertion
    $complainantData = array(
        ':fname' => $data['fname'],
        ':mname' => $data['mname'],
        ':lname' => $data['lname'],
        ':email' => $data['email'],
        ':number' => $data['number'],
        ':address' => $data['address'],
        ':age' => isset($data['age']) ? $data['age'] : null
    );

    $respondentData = array(
        ':respondent_name' => $data['respondent']
    );

    $caseData = array(
        ':place_of_occurrence' => $data['address'],
        ':date_time_occurrence' => isset($data['date_occurrence']) ? $data['date_occurrence'] : date('Y-m-d H:i:s'),
        ':complaint_type' => $data['complaint_type'],
        ':complaint_details' => $data['complaint_details']
    );

    try {
        $pdo->beginTransaction();

        // Insert into complainants_tbl
        $complainantsQuery = "INSERT INTO complainants_tbl (fname, mname, lname, email, number, address, age) 
                              VALUES (:fname, :mname, :lname, :email, :number, :address, :age)";
        $complainantsStmt = $pdo->prepare($complainantsQuery);
        foreach ($complainantData as $key => $value) {
            $complainantsStmt->bindValue($key, $value, is_null($value) ? PDO::PARAM_NULL : PDO::PARAM_STR);
        }
        $complainantsStmt->execute();
        $complainantId = $pdo->lastInsertId();

        // Insert into respondents_tbl
        $respondentsQuery = "INSERT INTO respondents_tbl (respondent_name) 
                             VALUES (:respondent_name)";
        $respondentsStmt = $pdo->prepare($respondentsQuery);
        foreach ($respondentData as $key => $value) {
            $respondentsStmt->bindValue($key, $value, PDO::PARAM_STR);
        }
        $respondentsStmt->execute();
        $respondentId = $pdo->lastInsertId();

        // Insert into cases_tbl
        $caseData[':complainant_id'] = $complainantId;
        $caseData[':respondent_id'] = $respondentId;
        $casesQuery = "INSERT INTO cases_tbl (complainant_id, respondent_id, place_of_occurrence, date_time_occurrence, complaint_type, complaint_details) 
                       VALUES (:complainant_id, :respondent_id, :place_of_occurrence, :date_time_occurrence, :complaint_type, :complaint_details)";
        $casesStmt = $pdo->prepare($casesQuery);
        foreach ($caseData as $key => $value) {
            $casesStmt->bindValue($key, $value, PDO::PARAM_STR);
        }
        $casesStmt->execute();
        $caseId = $pdo->lastInsertId();

        $pdo->commit();

        // Respond with success message
        echo json_encode(array('success' => true, 'message' => 'Data inserted successfully', 'case_id' => $caseId));

    } catch (PDOException $e) {
        $pdo->rollBack();
        handlePDOError($e);
    }

} else {
    header("HTTP/1.1 405 Method Not Allowed");
    header("Content-Type: application/json");
    echo json_encode(array('message' => 'Method Not Allowed'));
}
?>