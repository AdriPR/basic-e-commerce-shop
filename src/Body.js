import React, {useState, useEffect} from "react";
import axios from "axios";

function Body({selectedCategoria}) {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (selectedCategoria) {
            axios({
                method: 'get',
                url: 'http://localhost:8081/php/productos.php',
                params: {
                    id_categoria: selectedCategoria.id_categoria
                }
            })
                .then(response => {
                    setProductos(response.data);
                })
                .catch(error => {
                    console.error('Error fetching productos:', error);
                });
        }
    }, [selectedCategoria]);

    const addToCart = (producto) => {
        axios({
            method: 'post',
            url: 'http://localhost:8081/php/carrito.php',
            data: {
                id_producto: producto.id_producto,
                descripcion_corta: producto.descripcion_corta,
                descripcion_larga: producto.descripcion_larga,
                precio_actual: producto.precio_actual,
                cantidad: 1
            },
            withCredentials: true
        })
            .then(response => {
                console.log(response);
            })
        window.location.reload();
    }

    const productList = productos.map(producto => (
        <div key={producto.id_producto} className="producto">
            <h3>{producto.descripcion_corta}</h3>
            <p>{producto.descripcion_larga}</p>
            <p>{producto.precio_actual}</p>
            <button className="add-to-cart-button" onClick={() => addToCart(producto)}>Añadir al carrito</button>
        </div>
    ));

    return (
        <div className="body">
            {selectedCategoria ? (
                <div>
                    <h1>{selectedCategoria.nombre}</h1>
                    {productList}
                </div>
            ) : (
                <h1>Seleccione una categoría</h1>
            )}
        </div>
    );
}

export default Body;
