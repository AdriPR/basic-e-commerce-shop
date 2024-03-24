<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
header("Access-Control-Allow-Credentials: true");
header("connection:keep-alive");

session_start();

if (!isset($_SESSION['carrito'])) {
    $_SESSION['carrito'] = [];
}

$request_body = file_get_contents('php://input');
$producto = json_decode($request_body, true);

if ($producto !== null && isset($producto['id_producto'])) {
    $idProducto = $producto['id_producto'];

    foreach ($_SESSION['carrito'] as $index => $item) {
        if ($item['id_producto'] === $idProducto) {
            unset($_SESSION['carrito'][$index]);
            $_SESSION['carrito'] = array_values($_SESSION['carrito']); // reindex the array
            echo json_encode($_SESSION['carrito']);
            return;
        }
    }
}

echo json_encode($_SESSION['carrito']);
?>
