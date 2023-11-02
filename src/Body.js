import React, {useState, useEffect} from "react";
import axios from "axios";

function Body({selectedCategoria, cantidadCarrito, setCantidadCarrito}) {

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
            url: 'http://localhost:8081/php/agregar_carrito.php',
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
        setCantidadCarrito(cantidadCarrito + 1);
    }

    const productList = productos.map(producto => (
        <div key={producto.id_producto} className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{producto.descripcion_corta}</h5>
                    <p className="card-text">{producto.descripcion_larga}</p>
                    <p className="card-text">{parseFloat(producto.precio_actual).toFixed(2)}€</p>
                    <button className="btn btn-primary" onClick={() => addToCart(producto)}>Añadir al carrito</button>
                </div>
            </div>
        </div>
    ));


    return (
        <div className="body">
        <div className="container">
            <div className="row">
                {selectedCategoria ? (
                    <div>
                        <h1>{selectedCategoria.nombre}</h1>
                        <div className="row">
                            {productList}
                        </div>
                    </div>
                ) : (
                    <h1>Seleccione una categoría</h1>
                )}
            </div>
        </div>
        </div>
    );
}

export default Body;
