<?php
include '../php/connection/connection.php';

// Function to handle PDO errors
function handlePDOError(PDOException $e) {
    echo json_encode(array('success' => false, 'message' => 'PDO Error: ' . $e->getMessage()));
    exit();
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  
  // Sample data (replace with actual data from Next.js frontend)
  $data = array(
    'fname' => 'John',
    'mname' => 'Doe',
    'lname' => 'Smith',
    'email' => 'john.doe@example.com',
    'number' => '12345',
    'address' => '123 Main St',
    'age' => 30,
    'respondent' => 'Jane Doe',
    'complaint_type' => 'Noise',
    'complaint_details' => 'Loud music late at night'
  );

  // Extract data for each table (adjust as per your actual data structure)
  $complainantData = array(
    ':fname' => isset($data['fname']) ? $data['fname'] : null,
    ':mname' => isset($data['mname']) ? $data['mname'] : null,
    ':lname' => isset($data['lname']) ? $data['lname'] : null,
    ':email' => isset($data['email']) ? $data['email'] : null,
    ':number' => isset($data['number']) ? $data['number'] : null,
    ':address' => isset($data['address']) ? $data['address'] : null,
    ':age' => isset($data['age']) ? $data['age'] : null
  );

  $respondentData = array(
    ':respondent_name' => isset($data['respondent']) ? $data['respondent'] : null,
  );

  $caseData = array(
    ':place_of_occurrence' => isset($data['address']) ? $data['address'] : null,
    ':date_time_occurrence' => date('Y-m-d H:i:s'), // Example: current date and time
    ':complaint_type' => isset($data['complaint_type']) ? $data['complaint_type'] : null,
    ':complaint_details' => isset($data['complaint_details']) ? $data['complaint_details'] : null
  );

  try {
    // Begin transaction
    $pdo->beginTransaction();

    // Insert into complainants_tbl
    $complainantsQuery = "INSERT INTO complainants_tbl (fname, mname, lname, email, number, address, age) 
                          VALUES (:fname, :mname, :lname, :email, :number, :address, :age)";
    $complainantsStmt = $pdo->prepare($complainantsQuery);
    $complainantsStmt->bindParam(':fname', $complainantData[':fname'], PDO::PARAM_STR);
    $complainantsStmt->bindParam(':mname', $complainantData[':mname'], PDO::PARAM_STR);
    $complainantsStmt->bindParam(':lname', $complainantData[':lname'], PDO::PARAM_STR);
    $complainantsStmt->bindParam(':email', $complainantData[':email'], PDO::PARAM_STR);
    $complainantsStmt->bindParam(':number', $complainantData[':number'], PDO::PARAM_STR);
    $complainantsStmt->bindParam(':address', $complainantData[':address'], PDO::PARAM_STR);
    $complainantsStmt->bindParam(':age', $complainantData[':age'], PDO::PARAM_INT);
    $complainantsStmt->execute();
    $complainantId = $pdo->lastInsertId();

    // Insert into respondents_tbl
    $respondentsQuery = "INSERT INTO respondents_tbl (respondent_name) 
                         VALUES (:respondent_name)";
    $respondentsStmt = $pdo->prepare($respondentsQuery);
    $respondentsStmt->bindParam(':respondent_name', $respondentData[':respondent_name'], PDO::PARAM_STR);
    $respondentsStmt->execute();
    $respondentId = $pdo->lastInsertId();

    // Insert into cases_tbl
    $caseData[':complainant_id'] = $complainantId;
    $caseData[':respondent_id'] = $respondentId;
    $casesQuery = "INSERT INTO cases_tbl (complainant_id, respondent_id, place_of_occurrence, date_time_occurrence, complaint_type, complaint_details) 
                   VALUES (:complainant_id, :respondent_id, :place_of_occurrence, :date_time_occurrence, :complaint_type, :complaint_details)";
    $casesStmt = $pdo->prepare($casesQuery);
    $casesStmt->bindParam(':complainant_id', $caseData[':complainant_id'], PDO::PARAM_INT);
    $casesStmt->bindParam(':respondent_id', $caseData[':respondent_id'], PDO::PARAM_INT);
    $casesStmt->bindParam(':place_of_occurrence', $caseData[':place_of_occurrence'], PDO::PARAM_STR);
    $casesStmt->bindParam(':date_time_occurrence', $caseData[':date_time_occurrence'], PDO::PARAM_STR);
    $casesStmt->bindParam(':complaint_type', $caseData[':complaint_type'], PDO::PARAM_STR);
    $casesStmt->bindParam(':complaint_details', $caseData[':complaint_details'], PDO::PARAM_STR);
    $casesStmt->execute();
    $caseId = $pdo->lastInsertId();

    // Commit transaction
    $pdo->commit();

    // Prepare response
    $response = array(
      'success' => true,
      'message' => 'Data inserted successfully!',
      'case_id' => $caseId
    );

    // Output the JSON response
    echo json_encode($response);
    
  } catch (PDOException $e) {
    // Rollback transaction on error
    $pdo->rollBack();
    handlePDOError($e);
  }

} else {
  // Handle other HTTP methods (e.g., GET, PUT, DELETE)
  header("HTTP/1.1 405 Method Not Allowed");
  echo json_encode(array('message' => 'Method Not Allowed'));
}
?>