import React, { useState, useEffect } from "react";

function Body({ categorias }) {

    const [productos, setProductos] = useState([]);

    // Get selected categoria
    const selectedCategoria = categorias.find(categoria => categoria.selected);

    // Fetch productos when a categoria is selected
    useEffect(() => {
        if (selectedCategoria) {
            fetch(`http://localhost/productos.php?id_categoria=${selectedCategoria.id_categoria}`)
                .then(response => response.json())
                .then(data => {
                    setProductos(data);
                })
                .catch(error => {
                    console.error('Error fetching productos:', error);
                });
        }
    }, [selectedCategoria]);

    const productList = productos.map(producto => (
        <div key={producto.id_producto} className="producto">
            <h3>{producto.descripcion_corta}</h3>
            <p>{producto.descripcion_larga}</p>
            <p>{producto.precio_actual}</p>
            <button className="add-to-cart-button">Agregar al carrito</button>
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
