<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
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

$nombre = isset($_GET['nombre']) ? $_GET['nombre'] : '';

$sql = "SELECT p.id_producto, p.nombre, p.descripcion, p.precio_actual, p.imagen_url FROM PRODUCTO p JOIN CATEGORIA c ON p.id_categoria = c.id_categoria WHERE c.mostrar = 1 AND p.nombre LIKE '%$nombre%'";

$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close();

echo json_encode($products);

?>