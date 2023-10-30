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

$id_categoria = isset($_GET['id_categoria']) ? $_GET['id_categoria'] : 2;

// get all products from a category. first get all products id from table ASIGNAR
// then get all products from table PRODUCTO
// name and description from product can be obtained DESC_PROD atributes descripcion_corta and descripcion_larga

$sql = "SELECT p.id_producto, d.descripcion_corta, d.descripcion_larga, p.precio_actual FROM ASIGNAR a JOIN DESC_PROD d ON a.id_producto = d.id_producto JOIN PRODUCTO p ON p.id_producto = d.id_producto WHERE a.id_categoria = $id_categoria";

$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');

echo json_encode($products);

