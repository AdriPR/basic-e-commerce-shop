import React, {useState} from 'react';
import {FaBars, FaTimes, FaUserCircle, FaRegUserCircle, FaShoppingCart} from 'react-icons/fa';
import {Link} from "react-router-dom";

function Header({categorias, cantidadCarrito}) {

    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="header">
            <nav className="nav">
                <div className="menu">
                    <button className="menu-button" onClick={handleMenuClick}>
                        {isOpen ? <FaTimes/> : <FaBars/>}
                    </button>
                    <div className={`menu-content ${isOpen ? 'open' : 'close'}`}>
                        <div className="categorias">
                            <ul className="categorias-list">
                                <li key="Inicio"
                                    className={categorias.every(categoria => !categoria.selected) ? 'selected' : ''}>
                                    <Link to="/">Inicio</Link>
                                </li>
                                {categorias.map(categoria => {
                                    const path = categoria.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s/g, "-");

                                    return (
                                        <li key={categoria.id_categoria}
                                            className={categoria.selected ? 'selected' : ''}>
                                            <Link to={path}>{categoria.nombre}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button className="login-button"><FaUserCircle/> Login</button>
                    <button className="register-button"><FaRegUserCircle/> Registrarse</button>
                    <button className="cart-button"><FaShoppingCart/> Carrito ({cantidadCarrito})</button>
                </div>
            </nav>
        </div>
    );
}

export default Header;