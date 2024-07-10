<?php

include '../php/connection/connection.php';

header("Content-Type: application/json");


$content = trim(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  header("HTTP/1.1 405 Method Not Allowed");
    $response = array(
      'message' => 'success',
      'status' => 200,
  );
  

  echo json_encode($response);


}