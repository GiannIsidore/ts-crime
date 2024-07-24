<?php

include '../php/connection/connection.php';

function handlePDOError(PDOException $e) {
    file_put_contents('php_debug.log', "PDO Error: " . $e->getMessage() . "\n", FILE_APPEND);
    header("Content-Type: application/json");
    echo json_encode(array('success' => false, 'message' => 'PDO Error: ' . $e->getMessage()));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header("Content-Type: application/json");

    $content = trim(file_get_contents("php://input"));
    $requestData = json_decode($content, true);

    //! Log raw and decoded data
    file_put_contents('php_debug.log', "Raw data: " . $content . "\n", FILE_APPEND);
    file_put_contents('php_debug.log', "Decoded data: " . print_r($requestData, true) . "\n", FILE_APPEND);

    //! JSON errors and data validity
    if (json_last_error() !== JSON_ERROR_NONE || !$requestData) {
        http_response_code(400); 
        echo json_encode(array('success' => false, 'message' => 'Invalid JSON data'));
        exit();
    }

    if (!isset($requestData['data'])) {
        http_response_code(400); 
        echo json_encode(array('success' => false, 'message' => 'Missing data object'));
        exit();
    }

    $data = $requestData['data'];

    //! Array insertion
    $complainantData = array(
       ':complainant_name' => $data['complainant'],
    );

    $respondentData = array(
        ':respondent_name' => $data['respondent'],
    );

    $caseData = array(
        ':place_of_occurrence' => $data['place_occurrence'], 
        ':date_time_occurrence' => date('Y-m-d H:i:s'), 
        ':complaint_type' => $data['complaint_type'],
        ':complaint_details' => $data['complaint_details'],
        ':resolution' => $data['resolution']
    );

    try {
        $conn->beginTransaction();

        // Insert into complainant
        $complainantsQuery = "INSERT INTO complainant (complainant_name) VALUES (:complainant_name)";
        $complainantsStmt = $conn->prepare($complainantsQuery);
        $complainantsStmt->bindValue(':complainant_name', $complainantData[':complainant_name'], PDO::PARAM_STR);
        $complainantsStmt->execute();
        $complainantId = $conn->lastInsertId();
        file_put_contents('php_debug.log', "Inserted complainant ID: " . $complainantId . "\n", FILE_APPEND);

        // Insert into respondent
        $respondentsQuery = "INSERT INTO respondent (respondent_name) VALUES (:respondent_name)";
        $respondentsStmt = $conn->prepare($respondentsQuery);
        $respondentsStmt->bindValue(':respondent_name', $respondentData[':respondent_name'], PDO::PARAM_STR);
        $respondentsStmt->execute();
        $respondentId = $conn->lastInsertId();
        file_put_contents('php_debug.log', "Inserted respondent ID: " . $respondentId . "\n", FILE_APPEND);

        // Insert into cases
        $caseData[':complainant_id'] = $complainantId;
        $caseData[':respondent_id'] = $respondentId;
        $casesQuery = "INSERT INTO cases (complainant_id, respondent_id, place_of_occurrence, date_time_occurrence, complaint_type, complaint_details, resolution) 
                       VALUES (:complainant_id, :respondent_id, :place_of_occurrence, :date_time_occurrence, :complaint_type, :complaint_details, :resolution)";
        $casesStmt = $conn->prepare($casesQuery);
        foreach ($caseData as $key => $value) {
            $casesStmt->bindValue($key, $value, PDO::PARAM_STR);
        }
        $casesStmt->execute();
        $caseId = $conn->lastInsertId();
        file_put_contents('php_debug.log', "Inserted case ID: " . $caseId . "\n", FILE_APPEND);

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