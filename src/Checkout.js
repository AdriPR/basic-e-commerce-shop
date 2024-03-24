import React, { useState } from "react";
import axios from "axios";
import CheckoutConfirmation from "./CheckoutConfirmation";
import {apiHost} from "./Constants";

function Checkout({cartItems, setCartItems}) {
    const [guestEmail, setGuestEmail] = useState("");
    const [guestAddress, setGuestAddress] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [registeredEmail, setRegisteredEmail] = useState("");
    const [registeredAddress, setRegisteredAddress] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleCheckout = (isGuest) => {
        if (isGuest) {
            if (!guestEmail || !guestAddress) {
                alert("Por favor, complete todos los campos para realizar el checkout como invitado.");
                return;
            }
            setFullName("");
            setPassword("");
            setRegisteredEmail("");
            setRegisteredAddress("");
            setShowPopup(true);
        } else {
            if (!fullName || !password || !registeredEmail || !registeredAddress) {
                alert("Por favor, complete todos los campos para realizar el checkout como usuario registrado.");
                return;
            }
            axios({
                method: "post",
                url: apiHost + "/php/usuario_existe.php",
                data: { email: registeredEmail,
                        password: password },
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data !== 1) {
                        alert("Los datos introducidos no son correctos.");
                    } else {
                        setGuestEmail("");
                        setGuestAddress("");
                        setShowPopup(true);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });
            }
    }

    const onConfirm = () => {
        const productIds = cartItems.map((item) => item.id_producto);
        productIds.forEach((productId) => {
            axios({
                method: "delete",
                url: apiHost + "/php/eliminar_del_carrito.php",
                data: { id_producto: productId },
                withCredentials: true,
            });
        });
        setCartItems([]);
    }

    return (
        <div className="body">
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                        <div className="form">
                            <h2>Como invitado</h2>
                            <div className="row">
                                <label className="col-md-4">Correo electrónico:</label>
                                <input
                                    style={{width: "60%", margin: "10px"}}
                                    type="email"
                                    className="form-control col-md-8"
                                    value={guestEmail}
                                    onChange={(e) => setGuestEmail(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <label className="col-md-4">Dirección de envío:</label>
                                <input
                                    style={{width: "60%", margin: "10px"}}
                                    type="text"
                                    className="form-control col-md-8"
                                    value={guestAddress}
                                    onChange={(e) => setGuestAddress(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={() => handleCheckout(true)}>Checkout</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form">
                            <h2>Como usuario registrado</h2>
                            <div className="row">
                                <label className="col-md-4">Nombre completo:</label>
                                <input
                                    style={{width: "60%", margin: "10px"}}
                                    type="text"
                                    className="form-control col-md-8"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <label className="col-md-4">Contraseña:</label>
                                <input
                                    style={{width: "60%", margin: "10px"}}
                                    type="password"
                                    className="form-control col-md-8"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <label className="col-md-4">Correo electrónico:</label>
                                <input
                                    style={{width: "60%", margin: "10px"}}
                                    type="email"
                                    className="form-control col-md-8"
                                    value={registeredEmail}
                                    onChange={(e) => setRegisteredEmail(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <label className="col-md-4">Dirección de envío:</label>
                                <input
                                    style={{width: "60%", margin: "10px"}}
                                    type="text"
                                    className="form-control col-md-8"
                                    value={registeredAddress}
                                    onChange={(e) => setRegisteredAddress(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={() => handleCheckout(false)}>Checkout</button>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
                {showPopup && (
                    <CheckoutConfirmation
                        guestEmail={guestEmail}
                        guestAddress={guestAddress}
                        fullName={fullName}
                        registeredEmail={registeredEmail}
                        registeredAddress={registeredAddress}
                        onConfirm={() => onConfirm()}
                        onClose={() => setShowPopup(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default Checkout;
