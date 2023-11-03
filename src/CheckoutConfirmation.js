import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function CheckoutConfirmation({guestEmail, guestAddress, fullName, registeredEmail, registeredAddress, onConfirm, onClose}) {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
            axios({
                url: "http://localhost:8081/php/recuperar_carrito.php",
                withCredentials: true,
            })
                .then((response) => {
                    setCartItems(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching cart items:", error);
                });
        }
        , []);

    const handleConfirmOrder = () => {
        const orderData = {
            guestEmail,
            guestAddress,
            fullName,
            registeredEmail,
            registeredAddress,
            cartItems
        };
        axios(
            {
                method: 'post',
                url: 'http://localhost:8081/php/pedido.php',
                data: orderData,
                withCredentials: true
            }
        )
            .then(response => {
                console.log("Pedido enviado correctamente:", response);
                alert("Pedido enviado correctamente");
                onConfirm();
            })
            .catch(error => {
                console.error("Error al enviar el pedido:", error);
            }
        )
    };

    return (
        <div className="popup">
            <div className="popup-content checkout">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Detalles del pedido</h2>
                <h5>Información del usuario:</h5>
                <div className="row user-info">
                {guestEmail && (
                    <div>
                        <p><strong>Correo electrónico:</strong> {guestEmail}</p>
                        <p><strong>Dirección de envío:</strong> {guestAddress}</p>
                    </div>
                )}
                {fullName && (
                    <div>
                        <p><strong>Nombre completo:</strong> {fullName}</p>
                        <p><strong>Correo electrónico:</strong> {registeredEmail}</p>
                        <p><strong>Dirección de envío:</strong> {registeredAddress}</p>
                    </div>
                )}
                </div>
                <h5>Productos en el carrito:</h5>
                <div className="row cart">
                {cartItems.map(item => (
                    <div key={item.id_producto} className="row cart-item">
                        <div className="col-md-2">
                            <div className="image-placeholder">
                                <p className="image-text">Imagen</p>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-2">{item.nombre}</div>
                        <div className="col-md-2">{item.cantidad}</div>
                        <div className="col-md-2">{parseFloat(item.precio_actual).toFixed(2)}€</div>
                        <div className="col-md-2"></div>
                    </div>
                ))}
                </div>
                <Link to="/">
                    <button className="btn btn-primary" onClick={handleConfirmOrder}>Confirmar y enviar pedido</button>
                </Link>
            </div>
        </div>
    );
}

export default CheckoutConfirmation;
