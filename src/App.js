import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Body from './Body';
import Header from "./Header";
import Cart from "./Cart";

function App() {

    const [cartItems, setCartItems] = useState([]);
    const[refreshCart, setRefreshCart] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const isLoaded = categorias.length > 0;
    const [cantidadCarrito, setCantidadCarrito] = useState(0);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8081/php/categorias.php'
        })
            .then(response => {
                const categoriasWithSelection = response.data.map(categoria => {
                    return {...categoria, selected: false};
                });
                setCategorias(categoriasWithSelection);
            })
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8081/php/cantidad_carrito.php',
            withCredentials: true
        })
            .then(response => {
                setCantidadCarrito(response.data.cantidad);
            })
    }, []);

    //Cambios en cartItems deben actualizar cantidadCarrito
    useEffect(() => {
        // contar cantidad de productos en cartItems
        let cantidad = 0;
        cartItems.forEach(item => {
            cantidad += parseInt(item.cantidad);
        });
        setCantidadCarrito(cantidad);
    }, [cartItems]);

    const routes = categorias.map(categoria => {
        const path = categoria.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s/g, "-");
        return (<Route key={categoria.id_categoria} path={`/${path}`} element={<Body selectedCategoria={categoria} setCartItems={setCartItems}/>}/>)
    });

    return (
        <Router>
            <Header categorias={categorias} cantidadCarrito={cantidadCarrito}/>
            {!isLoaded ? <div className="loading">Loading...</div> :
                <Fragment>
                    <Routes>
                        <Route exact path='/' element={<Body/>}/>
                        {routes}
                        <Route exact path='/carrito' element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>}/>
                    </Routes>
                </Fragment>
            }
        </Router>
    );
}

export default App;
