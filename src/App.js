import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Body from './Body';
import Header from "./Header";
import Cart from "./Cart";
import Checkout from "./Checkout";
import {apiHost} from "./Constants";
import Flags from "./Flags";

function App() {

    const [cartItems, setCartItems] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const isLoaded = categorias.length > 0;
    const [cantidadCarrito, setCantidadCarrito] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios({
            method: 'get',
            url: apiHost + "/php/categorias.php"
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
            url: apiHost + "/php/cantidad_carrito.php",
            withCredentials: true
        })
            .then(response => {
                setCantidadCarrito(response.data.cantidad);
            })
    }, []);

    useEffect(() => {
        let cantidad = 0;
        cartItems.forEach(item => {
            cantidad += parseInt(item.cantidad);
        });
        setCantidadCarrito(cantidad);
    }, [cartItems]);

    const routes = categorias.map(categoria => {
        const path = categoria.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s/g, "-");
        return (<Route key={categoria.id_categoria} exact path={`/${path}`}
                       element={<Body selectedCategoria={categoria} setCartItems={setCartItems} searchTerm={searchTerm}/>}/>)
    });

    return (
        <Router>
            <Header categorias={categorias} cantidadCarrito={cantidadCarrito} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            {!isLoaded ? <div className="loading">Loading...</div> :
                <Fragment>
                    <Routes>
                        <Route exact path='/flags' element={<Flags/>}/>
                        <Route exact path='/' element={<Body searchTerm={searchTerm}/>}/>
                        {routes}
                        <Route exact path='/carrito'
                               element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>}/>
                        <Route exact path='/checkout' element={<Checkout cartItems={cartItems} setCartItems={setCartItems}/>}/>
                    </Routes>
                </Fragment>
            }
        </Router>
    );
}

export default App;
