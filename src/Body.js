import React, {useState, useEffect} from "react";
import axios from "axios";

function Body({selectedCategoria, setCartItems}) {

    const [productos, setProductos] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (selectedCategoria) {
            axios({
                method: "get",
                url: "http://localhost:8081/php/productos.php",
                params: {
                    id_categoria: selectedCategoria.id_categoria,
                },
            })
                .then((response) => {
                    setProductos(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching productos:", error);
                });
        }
    }, [selectedCategoria]);

    const addToCart = (producto) => {
        axios({
            method: "post",
            url: "http://localhost:8081/php/agregar_carrito.php",
            data: {
                id_producto: producto.id_producto,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio_actual: producto.precio_actual,
                cantidad: producto.cantidad,
            },
            withCredentials: true,
        }).then((response) => {
            setCartItems(response.data)
        });
    };

    const productList = productos.map((producto) => {
        producto.cantidad = 1;
        return(
        <div key={producto.id_producto} className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <div className="row">
                        <div className="col-md image-placeholder">
                            <p className="image-text">Imagen</p>
                        </div>
                    </div>
                    <p className="card-text">{parseFloat(producto.precio_actual).toFixed(2)}€</p>
                    <button className="btn btn-primary" onClick={() => openDetailsPopup(producto)}>
                        Detalles
                    </button>
                </div>
            </div>
        </div>
    )});

    const openDetailsPopup = (producto) => {
        setSelectedProduct(producto);
    };

    const closeDetailsPopup = () => {
        setSelectedProduct(null);
    };

    const handleQuantityChange = (producto) => (e) => {
        producto.cantidad = e.target.value;
    }

    const detailsPopup = selectedProduct && (
        <div className="popup">
            <div className="popup-content">
            <span className="close" onClick={closeDetailsPopup}>
                &times;
            </span>
                <h1>{selectedProduct.nombre}</h1>
                <div className="row">
                    <div className="col-md-2">
                        <div className="image-placeholder">
                            <p className="image-text">Imagen</p>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <p>{selectedProduct.descripcion}</p>
                    </div>
                    <div className="row cart cart-item">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">Precio: {parseFloat(selectedProduct.precio_actual).toFixed(2)}€</div>
                        <div className="col-md-3">
                            Cantidad:
                            <input
                                type="number"
                                defaultValue={1}
                                min="1"
                                onChange={handleQuantityChange(selectedProduct)}
                            />
                        </div>
                        <button
                            className="col-md-2 btn btn-primary"
                            onClick={() => addToCart(selectedProduct)}
                        >
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

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
            {detailsPopup}
        </div>
    );
}

export default Body;
