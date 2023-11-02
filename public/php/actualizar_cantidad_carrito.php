<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: PUT');
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

if ($producto !== null && isset($producto['id_producto']) && isset($producto['cantidad'])) {
    $idProducto = $producto['id_producto'];
    $newQuantity = $producto['cantidad'];

    foreach ($_SESSION['carrito'] as &$item) {
        if ($item['id_producto'] === $idProducto) {
            $item['cantidad'] = $newQuantity;
            echo json_encode($_SESSION['carrito']);
            return;
        }
    }
}

echo json_encode($_SESSION['carrito']);
?>
