import React, { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [itemsToDelete, setItemsToDelete] = useState([]);
    const [itemsToUpdate, setItemsToUpdate] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        axios({
            url: 'http://localhost:8081/php/recuperar_carrito.php',
            withCredentials: true
        })
            .then(response => {
                setCartItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, []);

    const removeFromCart = (productId) => {
        setItemsToDelete([...itemsToDelete, productId]);
    };

    const updateQuantity = (productId, newQuantity) => {
        const quantity = parseInt(newQuantity);
        if (quantity === 0) {
            setItemsToDelete([...itemsToDelete, productId]);
            const updatedItems = cartItems.map(item => {
                if (item.id_producto === productId) {
                    return { ...item, cantidad: 0 };
                }
                return item;
            });
            setCartItems(updatedItems);
        } else {
            const updatedItems = cartItems.map(item => {
                if (item.id_producto === productId) {
                    return { ...item, cantidad: quantity };
                }
                return item;
            });
            setCartItems(updatedItems);
            const itemToUpdate = { id_producto: productId, cantidad: quantity };
            if (!itemsToUpdate.some(item => item.id_producto === productId)) {
                setItemsToUpdate([...itemsToUpdate, itemToUpdate]);
            } else {
                setItemsToUpdate(itemsToUpdate.map(item => (item.id_producto === productId ? itemToUpdate : item)));
            }
            if (itemsToDelete.includes(productId)) {
                const updatedItemsToDelete = itemsToDelete.filter(id => id !== productId);
                setItemsToDelete(updatedItemsToDelete);
            }
        }
    };

    const saveChanges = () => {
        setIsSaving(true);
        axios.all([
            ...itemsToDelete.map(productId =>
                axios({
                    method: 'delete',
                    url: 'http://localhost:8081/php/eliminar_del_carrito.php',
                    data: { id_producto: productId },
                    withCredentials: true
                })
            ),
            ...itemsToUpdate.map(item =>
                axios({
                    method: 'put',
                    url: 'http://localhost:8081/php/actualizar_cantidad_carrito.php',
                    data: item,
                    withCredentials: true
                })
            )
        ])
            .then(axios.spread((...responses) => {
                // Manejar las respuestas si es necesario
                console.log(responses);
                setItemsToDelete([]);
                setItemsToUpdate([]);
                setIsSaving(false);
            }))
            .catch(error => {
                console.error('Error saving changes:', error);
                setIsSaving(false);
            });
        window.location.reload();
    };

    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += parseFloat(item.precio_actual) * item.cantidad;
        });
        return total.toFixed(2); // Mostrar el total con dos decimales
    };

    const cartItemList = cartItems.map(item => (
        <div key={item.id_producto} className="row cart-item">
            <div className="col-md-2">
                <div className="image-placeholder">
                    <p className="image-text">Imagen</p>
                </div>
            </div>
            <div className="col-md-2">{item.descripcion_corta}</div>
            <div className="col-md-2">
                <input
                    type="number"
                    value={item.cantidad}
                    min="0"
                    onChange={(e) => updateQuantity(item.id_producto, e.target.value)}
                />
            </div>
            <div className="col-md-2">{parseFloat(item.precio_actual).toFixed(2)}€</div>
            <div className="col-md-2">
                <button className="btn btn-danger" onClick={() => removeFromCart(item.id_producto)}>Eliminar</button>
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
                            {isSaving ? (
                                <p>Guardando cambios...</p>
                            ) : (
                                <button className="btn btn-primary" onClick={saveChanges}>Guardar</button>
                            )}
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
