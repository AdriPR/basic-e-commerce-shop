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
$password = "I.Play_Th3_8anjo";
$dbname = "Tienda";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$id_categoria = isset($_GET['id_categoria']) ? $_GET['id_categoria'] : 2;

$sql = "SELECT p.id_producto, p.nombre, p.descripcion, p.precio_actual, p.imagen_url FROM PRODUCTO p WHERE p.id_categoria = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_categoria);
$stmt->execute();

$result = $stmt->get_result();

$products = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close();

echo json_encode($products);

?>
