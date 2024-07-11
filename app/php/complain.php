<?php

include '../php/connection/connection.php';
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  header("HTTP/1.1 405 Method Not Allowed");
  $content = trim(file_get_contents("php://input"));

  $stmt = "sql";

  // $response = array(
  //   'data' => 
  //     ['message' => 'success',
  //     'status' => 200]
  // );

  // $response = array(
  //   'error' => 
  //     ['message' => 'failed',
  //     'status' => 400]
  // );

  echo json_encode($response);
  //   echo json_encode(array("error" => "Bad Request"));

    // return json_encode($response);

}


// $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
// if ($contentType !== 'application/json') {
//   header("HTTP/1.1 415 Unsupported Media Type");
//   header("Content-Type: application/json");
//   echo json_encode(array("error" => "Unsupported Media Type"));
//   exit();


// }
    // ! insert code
   


    // $name = $_POST['fname'];
    // $email = $_POST['email'];
    // $number = $_POST['number'];
    // $respondent = $_POST['respondent'];
    // $respondent_address = $_POST['respondent_address'];
    // $date_occurence = $_POST['date_occurence'];
    // $address    = $_POST['address'];
    // $complaint_type = $_POST['complaint_type'];
    // $complaint_details  = $_POST['complaint_details'];

    // $complainant_id = 1;
    // $respondent_id = 2;
    // $place_of_occurence = "Macanhan";

//     $sql = $conn->prepare("INSERT INTO `cases_tbl`(
//     `complainant_id`,
//     `respondent_id`,
//     `place_of_occurence`,
//     `date_time_occurence`,
//     `case_details`
// )
// VALUES(
//     :complainant_id,
//     :respondent_id
//     :place_of_occurence,
//     :date_time_occurence,
//     :case_details
//     ");

    // $sql->bindParam('complainant_id', $complainant_id, PDO::PARAM_INT);
    // $sql->bindParam('respondent_id', $respondent_id, PDO::PARAM_INT);
    // $sql->bindParam('place_of_occurence', $place_of_occurence , PDO::PARAM_STR);
    // $sql->bindParam('date_time_occurence', $date_occurence, PDO::PARAM_STR);
    // $sql->bindParam('case_details', $complaint_details, PDO::PARAM_STR);

// $sql->execute();
//     $result = $sql->fetchAll(PDO::FETCH_ASSOC);

  //   if ($result) {
  //       $response = array(
  //         ['message' => 'success',
  //         'status' => 200,
  //         'data' => $result ] // Echo back the received data for demonstration purposes
  //       );
  // echo json_encode($response);

  //   } else {
  //       $response = array([
  //         'message' => 'failed',
  //         'status' => 400,
  //         'data' => $result
  //       ]); // Echo back the received data for demonstration purposes

  //       echo json_encode($response);
  //   }
  // exit();



// Ensure that the content type is JSON


// Receive the raw POST data

// Attempt to decode the incoming JSON request
// $decoded = json_decode($content, true);

// if (!is_array($decoded)) {
//   header("HTTP/1.1 400 Bad Request");
//   header("Content-Type: application/json");
//   echo json_encode(array("error" => "Bad Request"));
//   exit();
// }

// $response = array(
//   'message' => 'success',
//   'status' => 200,
//   'data' => $decoded  // Echo back the received data for demonstration purposes
// );

// Set response headers
// header("HTTP/1.1 200 OK");
// header("Content-Type: application/json");

// Encode and echo the response as JSON
// return json_encode([ 'message' => 'success' ]);
?>