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
    
    //! Log the raw input for makita sa php folder sa root directory
    file_put_contents('php_debug.log', "Raw data: " . $content . "\n", FILE_APPEND);

    $requestData = json_decode($content, true);

    //! Log the decoded data
    file_put_contents('php_debug.log', "Decoded data: " . print_r($requestData, true) . "\n", FILE_APPEND);

    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400); 
        echo json_encode(array('success' => false, 'message' => 'Invalid JSON data'));
        exit();
    }

    if (!$requestData || !isset($requestData['data'])) {
        http_response_code(400); 
        echo json_encode(array('success' => false, 'message' => 'Invalid JSON data'));
        exit();
    }

    $data = $requestData['data'];
    
    //! Log the ang resident data kay HUUUU ganina mao rajud ang sayop
    file_put_contents('php_debug.log', "is_resident value: " . print_r($data['is_resident'], true) . "\n", FILE_APPEND);
    
    if (!isset($data['is_resident']) || trim($data['is_resident']) === '') {
        http_response_code(400);
        echo json_encode(array('success' => false, 'message' => 'Missing or empty required field: is_resident'));
        exit();
    }
    
    //! check sa fields same sa other php kay para cool
    $requiredFields = ['first_name', 'last_name', 'phone', 'address'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || trim($data[$field]) === '') {
            http_response_code(400); 
            echo json_encode(array('success' => false, 'message' => 'Missing or empty required field: ' . $field));
            exit();
        }
    }

    $residencyData = array(
        ':first_name' => $data['first_name'],
        ':middle_name' => isset($data['middle_name']) ? $data['middle_name'] : null,
        ':last_name' => $data['last_name'],
        ':suffix' => isset($data['suffix']) ? $data['suffix'] : null,
        ':email' => isset($data['email']) ? $data['email'] : null,
        ':phone' => $data['phone'],
        ':address' => $data['address']
    );

 
    file_put_contents('php_debug.log', "Residency data: " . print_r($residencyData, true) . "\n", FILE_APPEND);

    try {
        $conn->beginTransaction();

     
        if ($data['is_resident'] == '1') { 
            $query = "INSERT INTO residents (first_name, middle_name, last_name, suffix, email, phone, address) 
                      VALUES (:first_name, :middle_name, :last_name, :suffix, :email, :phone, :address)";
        } else {
            $query = "INSERT INTO outsiders (first_name, middle_name, last_name, suffix, email, phone, address) 
                      VALUES (:first_name, :middle_name, :last_name, :suffix, :email, :phone, :address)";
        }

        $stmt = $conn->prepare($query);


        foreach ($residencyData as $key => $value) {
            $stmt->bindValue($key, $value, is_null($value) ? PDO::PARAM_NULL : PDO::PARAM_STR);
        }

        $stmt->execute();
        $conn->commit();

        echo json_encode(array('success' => true, 'message' => 'Data inserted successfully!'));

    } catch (PDOException $e) {
        $conn->rollBack();
        handlePDOError($e);
    }

} else {
    header("HTTP/1.1 405 Method Not Allowed");
    header("Content-Type: application/json");
    echo json_encode(array('message' => 'Method Not Allowed'));
}
    
   