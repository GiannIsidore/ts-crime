<?php

include './connection/connection.php';

header("Content-type: application/json");
$content = trim(file_get_contents("php://input"));
$data = json_decode($content, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $email = isset($data['email']) ? $data['email'] : null;
  $password = isset($data['password']) ? $data['password'] : null;

  $sql = "SELECT `employee_id`, `employee_fname`, `employee_lname`, `employee_email`, `employee_role`
    FROM employee_tbl
    WHERE employee_email = :email AND employee_password = :password";

  $stmt = $conn->prepare($sql);
  $stmt->bindParam(':email', $email, PDO::PARAM_STR);
  $stmt->bindParam(':password', $password, PDO::PARAM_STR);
  $stmt->execute();

  $result = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($result) {

    echo json_encode(array('data' => $result));
    // echo json_encode(array("data" => [ 
    //   'message' => 'Login Successful', 
    // ]));
  }
  else {
    echo json_encode(array("error" => [ 
      'message' => 'Wrong Credentials, Please try again', 
    ]));
  }

  // echo json_encode(array(
  //   "data" => [ 
  //     'email' => $data['email'], 
  //     'password' => $data['password']
  //   ]
  // ));
  
  // echo json_encode(array("data" => [ 'email' => $data['email'], 'password' => $data['password']]));
}