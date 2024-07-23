<?php

include '../php/connection/connection.php';

function handlePDOError(PDOException $e) {
    header("Content-Type: application/json");
    echo json_encode(array('success' => false, 'message' => 'PDO Error: ' . $e->getMessage()));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header("Content-Type: application/json");

    $content = trim(file_get_contents("php://input"));
    $requestData = json_decode($content, true);
  

    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400); 
        echo json_encode(array('success' => false, 'message' => 'Invalid JSON data'));
        exit();
    }
    if (!$requestData) {
        http_response_code(400); 
        echo json_encode(array('success' => false, 'message' => 'Invalid JSON data'));
        exit();
    }

    //! Check if 'data' key is present para sa nested
    if (!isset($requestData['data'])) {
        http_response_code(400); // Bad Request
        echo json_encode(array('success' => false, 'message' => 'Missing data object'));
        exit();
    }

    $data = $requestData['data'];

    //! Check required fields 
    $requiredFields = ['fname', 'mname', 'lname', 'email', 'number', 'address', 'respondent', 'complaint_type', 'complaint_details'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            http_response_code(400); 
            echo json_encode(array('success' => false, 'message' => 'Missing or empty required field: ' . $field));
            exit();
        }
    }

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
        ':respondent_name' => $data['respondent'],
    );

    $caseData = array(
        ':place_of_occurrence' => $data['address'],
        ':date_time_occurrence' => date('Y-m-d H:i:s'), 
        ':complaint_type' => $data['complaint_type'],
        ':complaint_details' => $data['complaint_details']
    );

    try {
       $conn->beginTransaction();
//!add function to check if complainant already exists
        //? Insert into complainants_tbl
        $complainantsQuery = "INSERT INTO case_tbl (fname, mname, lname, email, number, address, age) 
                              VALUES (:fname, :mname, :lname, :email, :number, :address, :age)";
        $complainantsStmt =$conn->prepare($complainantsQuery);
        foreach ($complainantData as $key => $value) {
            $complainantsStmt->bindValue($key, $value, is_null($value) ? PDO::PARAM_NULL : PDO::PARAM_STR);
        }
        $complainantsStmt->execute();
        $complainantId =$conn->lastInsertId();
//!add function to check if respondent already exists
        //? Insert into respondents_tbl
        $respondentsQuery = "INSERT INTO respondents_tbl (respondent_name) 
                             VALUES (:respondent_name)";
        $respondentsStmt =$conn->prepare($respondentsQuery);
        foreach ($respondentData as $key => $value) {
            $respondentsStmt->bindValue($key, $value, PDO::PARAM_STR);
        }
        $respondentsStmt->execute();
        $respondentId =$conn->lastInsertId();

        //? Insert into cases_tbl
        $caseData[':complainant_id'] = $complainantId;
        $caseData[':respondent_id'] = $respondentId;
        $casesQuery = "INSERT INTO cases_tbl (complainant_id, respondent_id, place_of_occurrence, date_time_occurrence, complaint_type, complaint_details) 
                       VALUES (:complainant_id, :respondent_id, :place_of_occurrence, :date_time_occurrence, :complaint_type, :complaint_details)";
        $casesStmt =$conn->prepare($casesQuery);
        foreach ($caseData as $key => $value) {
            $casesStmt->bindValue($key, $value, PDO::PARAM_STR);
        }
        $casesStmt->execute();
        $caseId =$conn->lastInsertId();

       $conn->commit();

        $response = array(
            'success' => true,
            'message' => 'Data inserted successfully!',
            'case_id' => $caseId
        );

        echo json_encode($response);

    } catch (PDOException $e) {
       $conn->rollBack();
        handlePDOError($e);
    }

} else {
    header("HTTP/1.1 405 Method Not Allowed");
    header("Content-Type: application/json");
    echo json_encode(array('message' => 'Method Not Allowed'));
}
?>