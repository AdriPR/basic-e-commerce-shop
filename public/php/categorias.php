<?php
// Habilitar la visualización de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tienda";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT id_categoria, nombre FROM CATEGORIA";

$result = $conn->query($sql);

$categories = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
} else {
    error_log("No se encontraron resultados para la consulta: " . $sql);
}

$conn->close();

header('Content-Type: application/json');

echo json_encode($categories);
