import React, { useState, useEffect } from "react";
import axios from "axios";

function Cart({cartItems, setCartItems}) {
    const [itemsToDelete, setItemsToDelete] = useState([]);

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
    }, []);

    const removeFromCart = (productId) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que quieres eliminar este producto del carrito?"
        );
        if (confirmDelete) {
            setItemsToDelete([...itemsToDelete, productId]);
            axios({
                method: "delete",
                url: "http://localhost:8081/php/eliminar_del_carrito.php",
                data: { id_producto: productId },
                withCredentials: true,
            });
        }
        window.location.reload();
    };

    const clearCart = () => {
        const confirmDeleteAll = window.confirm(
            "¿Estás seguro de que quieres eliminar todos los productos del carrito?"
        );
        if (confirmDeleteAll) {
            const productIds = cartItems.map((item) => item.id_producto);
            setItemsToDelete(productIds);
            productIds.forEach((productId) => {
                axios({
                    method: "delete",
                    url: "http://localhost:8081/php/eliminar_del_carrito.php",
                    data: { id_producto: productId },
                    withCredentials: true,
                });
            });
            window.location.reload();
        }
    };

    const updateQuantity = (cartItems, productId, quantity) => {
        axios({
            method: "post",
            url: "http://localhost:8081/php/actualizar_cantidad_carrito.php",
            data: {
                id_producto: productId,
                cantidad: quantity,
            },
            withCredentials: true,
        }).then((response) => {
            setCartItems(
                cartItems.map((item) => {
                    if (item.id_producto === productId) {
                        return { ...item, cantidad: quantity };
                    }
                    return item;
                })
            );
        });
    }

    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += parseFloat(item.precio_actual) * item.cantidad;
        });
        return total.toFixed(2);
    };

    const cartItemList = cartItems.map((item) => (
        <div key={item.id_producto} className="row cart-item">
            <div className="col-md-2">
                <div className="image-placeholder">
                    <p className="image-text">Imagen</p>
                </div>
            </div>
            <div className="col-md-2">{item.nombre}</div>
            <div className="col-md-2">
                <input
                    type="number"
                    defaultValue={item.cantidad}
                    min="1"
                    onChange={(e) => updateQuantity(cartItems, item.id_producto, e.target.value)}
                />
            </div>
            <div className="col-md-2">{parseFloat(item.precio_actual).toFixed(2)}€</div>
            <div className="col-md-2">
                <button className="btn btn-danger" onClick={() => removeFromCart(item.id_producto)}>
                    Eliminar
                </button>
            </div>
        </div>
    ));

    return (
        <div className="body">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {cartItems.length > 0 ? (
                            <div>
                                <h1>Carrito de compras</h1>
                                <div className="row cart-header">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-2">Nombre Producto</div>
                                    <div className="col-md-2">Cantidad</div>
                                    <div className="col-md-2">Precio</div>
                                    <div className="col-md-2"></div>
                                </div>
                                {cartItemList}
                                <h3>Total a pagar: {calculateTotalPrice()}€</h3>
                                <div className="buttons">
                                    <button className="btn btn-danger" onClick={clearCart}>
                                        Vaciar carrito
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <h2>El carrito está vacío</h2>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
