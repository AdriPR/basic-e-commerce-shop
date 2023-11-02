<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
header("Access-Control-Allow-Credentials: true");
header("connection:keep-alive");

session_start();

if (!isset($_SESSION['carrito'])) {
    $_SESSION['carrito'] = [];
}

// Decodificar el JSON recibido del cuerpo de la solicitud
$request_body = file_get_contents('php://input');
$producto = json_decode($request_body, true);

// Añadir el producto al carrito si el JSON se ha decodificado correctamente
if ($producto !== null) {
    // Si el producto ya existe en el carrito, incrementar su cantidad
    foreach ($_SESSION['carrito'] as &$item) {
        if ($item['id_producto'] === $producto['id_producto']) {
            $item['cantidad'] += $producto['cantidad'];
            echo json_encode($_SESSION['carrito']);
            return;
        }
    }
    $_SESSION['carrito'][] = $producto;
    echo json_encode($_SESSION['carrito']);
} else {
    echo json_encode(array('error' => 'Error al procesar el producto'));
}
?>