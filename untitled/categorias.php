<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
$servername = "localhost";
$username = "";
$password = "";
$dbname = "nombre_de_la_base_de_datos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT id_categoria, nombre_categoria FROM CATEGORIA_PRODUCTO";
$result = $conn->query($sql);

$categories = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($categories);
?>
