<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
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

$request_body = file_get_contents('php://input');
$pedido = json_decode($request_body, true);

if ($pedido === null) {
    echo json_encode(array('error' => 'Error al procesar el pedido'));
    return;
} else {
    $cartItems = $pedido['cartItems'];
    if ($pedido['guestEmail'] !== null && $pedido['guestAddress'] !== null && $pedido['guestEmail'] !== '' && $pedido['guestAddress'] !== '') {
        $guestEmail = $pedido['guestEmail'];
        $guestAddress = $pedido['guestAddress'];
        $id_cliente = null;

        $sqlCheckClient = $conn->prepare("SELECT id_cliente FROM CLIENTE_NO_REGISTRADO WHERE email = ?");
        $sqlCheckClient->bind_param("s", $guestEmail);
        $sqlCheckClient->execute();
        $result = $sqlCheckClient->get_result();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $id_cliente = $row['id_cliente'];
            }
        } else {
            $sqlInsertClient = "INSERT INTO CLIENTE (id_cliente) VALUES (DEFAULT)";
            if ($conn->query($sqlInsertClient) === TRUE) {
                $id_cliente = $conn->insert_id;
                $sqlInsertUnregisteredClient = $conn->prepare("INSERT INTO CLIENTE_NO_REGISTRADO (id_cliente, email) VALUES (?, ?)");
                $sqlInsertUnregisteredClient->bind_param("is", $id_cliente, $guestEmail);
                if ($sqlInsertUnregisteredClient->execute() !== TRUE) {
                    echo "Error al insertar el cliente no registrado: " . $conn->error;
                }
            } else {
                echo "Error al insertar el cliente: " . $conn->error;
            }
        }

        $sqlInsertOrder = $conn->prepare("INSERT INTO PEDIDO (id_cliente, direccion_envio) VALUES (?, ?)");
        $sqlInsertOrder->bind_param("is", $id_cliente, $guestAddress);
        if ($sqlInsertOrder->execute() === TRUE) {
            $id_pedido = $conn->insert_id;
            $sqlInsertDetails = "INSERT INTO DETALLES_PEDIDO (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sqlInsertDetails);
            foreach ($cartItems as $item) {
                $stmt->bind_param("iiii", $id_pedido, $item['id_producto'], $item['cantidad'], $item['precio_actual']);
                if ($stmt->execute() !== TRUE) {
                    echo "Error al insertar los detalles del pedido: " . $conn->error;
                }
            }
            $stmt->close();
        } else {
            echo "Error al insertar el pedido: " . $conn->error;
        }
    }

    if ($pedido['fullName'] !== null && $pedido['registeredEmail'] !== null && $pedido['registeredAddress'] !== null && $pedido['fullName'] !== '' && $pedido['registeredEmail'] !== '' && $pedido['registeredAddress'] !== '') {
        $fullName = $pedido['fullName'];
        $registeredEmail = $pedido['registeredEmail'];
        $registeredAddress = $pedido['registeredAddress'];
        $sqlCheckClient = $conn->prepare("SELECT id_cliente FROM CLIENTE_REGISTRADO WHERE email = ?");
        $sqlCheckClient->bind_param("s", $registeredEmail);
        $sqlCheckClient->execute();
        $result = $sqlCheckClient->get_result();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $id_cliente = $row['id_cliente'];
            }

            $sqlInsertOrder = $conn->prepare("INSERT INTO PEDIDO (id_cliente, direccion_envio) VALUES (?, ?)");
            $sqlInsertOrder->bind_param("is", $id_cliente, $registeredAddress);
            if ($sqlInsertOrder->execute() === TRUE) {
                $id_pedido = $conn->insert_id;
                $sqlInsertDetails = "INSERT INTO DETALLES_PEDIDO (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)";
                $stmt = $conn->prepare($sqlInsertDetails);
                foreach ($cartItems as $item) {
                    $stmt->bind_param("iiii", $id_pedido, $item['id_producto'], $item['cantidad'], $item['precio_actual']);
                    if ($stmt->execute() !== TRUE) {
                        echo "Error al insertar los detalles del pedido: " . $conn->error;
                    }
                }
                $stmt->close();
            } else {
                echo "Error al insertar el pedido: " . $conn->error;
            }
        } else {
            echo "El cliente no está registrado en la base de datos";
        }
    }
}
$conn->close();
?>
