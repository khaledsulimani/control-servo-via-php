<?php
$mysqli = new mysqli("localhost", "root", "", "robot_arm_db");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $mysqli->prepare("INSERT INTO motor_positions (motor1, motor2, motor3, motor4, motor5, motor6) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "iiiiii",
    $data['motor1'],
    $data['motor2'],
    $data['motor3'],
    $data['motor4'],
    $data['motor5'],
    $data['motor6']
);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}

$stmt->close();
$mysqli->close();
?>