<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "crime_database";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//   echo "<p>Conncted</p>";
} catch(PDOException $e) {
//   echo "Connection failed: " . $e->getMessage();
// echo `console.log("FALLLLLLLLSEEEEE")`;
}
?>