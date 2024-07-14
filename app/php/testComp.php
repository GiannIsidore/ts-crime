<?php
include '../php/connection/connection.php';
// Enable CORS (if needed)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Read JSON input from the request body
$content = trim(file_get_contents("php://input"));
$requestData = json_decode($content, true);

// Check if JSON data was successfully decoded
if (!$requestData) {
    http_response_code(400); 
    echo json_encode(array('success' => false, 'message' => 'Invalid JSON data'));
    exit();
}

//     $complainantData = array(
//         ':fname' => $data['fname'],
//         ':mname' => $data['mname'],
//         ':lname' => $data['lname'],
//         ':email' => $data['email'],
//         ':number' => $data['number'],
//         ':address' => $data['address'],
//         ':age' => isset($data['age']) ? $data['age'] : null
//     );

//     $respondentData = array(
//         ':respondent_name' => $data['respondent'],
//     );

//     $caseData = array(
//         ':place_of_occurrence' => $data['address'],
//         ':date_time_occurrence' => date('Y-m-d H:i:s'), 
//         ':complaint_type' => $data['complaint_type'],
//         ':complaint_details' => $data['complaint_details']
//     );

//     try {
//        $conn->beginTransaction();
// //!add function to check if complainant already exists
//         //? Insert into complainants_tbl
//         $complainantsQuery = "INSERT INTO complainants_tbl (fname, mname, lname, email, number, address, age) 
//                               VALUES (:fname, :mname, :lname, :email, :number, :address, :age)";
//         $complainantsStmt =$conn->prepare($complainantsQuery);
//         foreach ($complainantData as $key => $value) {
//             $complainantsStmt->bindValue($key, $value, is_null($value) ? PDO::PARAM_NULL : PDO::PARAM_STR);
//         }
//         $complainantsStmt->execute();
//         $complainantId =$conn->lastInsertId();
// //!add function to check if respondent already exists
//         //? Insert into respondents_tbl
//         $respondentsQuery = "INSERT INTO respondents_tbl (respondent_name) 
//                              VALUES (:respondent_name)";
//         $respondentsStmt =$conn->prepare($respondentsQuery);
//         foreach ($respondentData as $key => $value) {
//             $respondentsStmt->bindValue($key, $value, PDO::PARAM_STR);
//         }
//         $respondentsStmt->execute();
//         $respondentId =$conn->lastInsertId();

//         //? Insert into cases_tbl
//         $caseData[':complainant_id'] = $complainantId;
//         $caseData[':respondent_id'] = $respondentId;
//         $casesQuery = "INSERT INTO cases_tbl (complainant_id, respondent_id, place_of_occurrence, date_time_occurrence, complaint_type, complaint_details) 
//                        VALUES (:complainant_id, :respondent_id, :place_of_occurrence, :date_time_occurrence, :complaint_type, :complaint_details)";
//         $casesStmt =$conn->prepare($casesQuery);
//         foreach ($caseData as $key => $value) {
//             $casesStmt->bindValue($key, $value, PDO::PARAM_STR);
//         }
//         $casesStmt->execute();
//         $caseId =$conn->lastInsertId();

//        $conn->commit();

//         $response = array(
//             'success' => true,
//             'message' => 'Data inserted successfully!',
//             'case_id' => $caseId
//         );

//         echo json_encode($response);

//     } catch (PDOException $e) {
//        $conn->rollBack();
       
//     }

// Respond with success message
echo json_encode(array('success' => true, 'message' => 'JSON data received successfully'));