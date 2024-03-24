<?php
// Habilitar la visualización de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
header("Access-Control-Allow-Credentials: true");
header("connection:keep-alive");

$servername = "localhost";
$username = "riebeck";
$password = "malvavisco";
$dbname = "Tienda";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT id_categoria, nombre FROM CATEGORIA WHERE mostrar = 1";

// prepare sql
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

$categories = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
} else {
    error_log("No se encontraron resultados para la consulta: " . $sql);
}

$conn->close();

echo json_encode($categories);
?>
