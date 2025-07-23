<?php
// load_positions.php

$mysqli = new mysqli("localhost", "root", "", "robot_arm_db");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$query = "SELECT * FROM motor_positions";
$result = $mysqli->query($query);

$positions = [];
while ($row = $result->fetch_assoc()) {
    $positions[] = $row;
}

echo json_encode($positions);

$mysqli->close();
?>