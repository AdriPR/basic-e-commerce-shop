<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
header("Access-Control-Allow-Credentials: true");
header("connection:keep-alive");

$servername = "localhost";
$username = "riebeck";
$password = "I.Play_Th3_8anjo";
$dbname = "Tienda";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$request_body = file_get_contents('php://input');
$user_data = json_decode($request_body, true);

$email = $user_data['email'];
$password = isset($user_data['password']) ? $user_data['password'] : '';

if (!empty($password)) {
    $sql = "SELECT EXISTS(SELECT 1 FROM CLIENTE_REGISTRADO WHERE email = ? AND contraseña = ?) AS exist";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        $row = $result->fetch_assoc();
        echo $row['exist'];
    } else {
        echo "Error al verificar la existencia del usuario: " . $conn->error;
    }

    $stmt->close();
} else {
    echo "La contraseña no fue proporcionada.";
}

$conn->close();
?>
