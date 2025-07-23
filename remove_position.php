<?php
<?php
$mysqli = new mysqli("localhost", "root", "", "robot_arm_db");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$id = intval($_GET['id']);

$stmt = $mysqli->prepare("DELETE FROM motor_positions WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}

$stmt->close();
$mysqli->close();
?>