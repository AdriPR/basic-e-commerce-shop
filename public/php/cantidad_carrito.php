<?php

session_start();

header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
header("Access-Control-Allow-Credentials: true");
header("connection:keep-alive");

if (!isset($_SESSION['carrito'])) {
    $_SESSION['carrito'] = [];
}

$cantidad = 0;
foreach ($_SESSION['carrito'] as $item) {
    $cantidad += $item['cantidad'];
}

echo json_encode(array('cantidad' => $cantidad));
?>

