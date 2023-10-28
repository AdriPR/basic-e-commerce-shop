import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Body from './Body';
import { PrivateRoute } from './PrivateRoute';
import Header from "./Header";

function App() {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('http://localhost/categorias.php')
            .then(response => response.json())
            .then(data => {
                const categoriasWithSelection = data.map(categoria => {
                    return { ...categoria, selected: false };
                });
                setCategorias(categoriasWithSelection);
            });
    }, []);


    return (
        <Router>
            <Header categorias={categorias} setCategorias={setCategorias} />
            <Fragment>
                <Routes>
                    <Route exact path='/' element={<Body categorias={categorias} />} />
                </Routes>
            </Fragment>
        </Router>
    );
}

export default App;
