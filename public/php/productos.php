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
$username = "root";
$password = "";
$dbname = "PRA1";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$id_categoria = isset($_GET['id_categoria']) ? $_GET['id_categoria'] : 2;

// get all products from a category. first get all products id from table ASIGNAR
// then get all products from table PRODUCTO
// name and description from product can be obtained DESC_PROD atributes nombre and descripcion

$sql = "SELECT p.id_producto, p.nombre, p.descripcion, p.precio_actual, p.imagen_url FROM PRODUCTO p WHERE p.id_categoria = $id_categoria";

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
