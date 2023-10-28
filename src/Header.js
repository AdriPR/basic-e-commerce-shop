import React, { useState } from 'react';
import { FaBars, FaTimes, FaUserCircle, FaRegUserCircle, FaShoppingCart } from 'react-icons/fa';
import Categorias from "./Categorias";

function Header({categorias, setCategorias}) {

    const [isOpen, setIsOpen] = useState(false);
    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="header">
            <nav className="nav">
                <div className="menu">
                    <button className="menu-button" onClick={handleMenuClick}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <div className={`menu-content ${isOpen ? 'open' : 'close'}`}>
                        <Categorias categorias={categorias} setCategorias={setCategorias} />
                    </div>
                </div>
                <div className="buttons">
                    <button className="login-button"><FaUserCircle /> Login</button>
                    <button className="register-button"><FaRegUserCircle /> Registrarse</button>
                    <button className="cart-button"><FaShoppingCart /> Carrito</button>
                </div>
            </nav>
        </div>
    );
}

export default Header;