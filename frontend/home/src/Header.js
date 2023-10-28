// Importar React, los estilos y los iconos
import React, { useState } from 'react';
import './Header.css';
import { FaBars, FaTimes, FaUserCircle, FaRegUserCircle, FaShoppingCart } from 'react-icons/fa';

// Definir el componente Header como una función
function Header() {
    // Definir un estado para controlar si el menú está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);

    // Definir una función para manejar el clic en el menú hamburguesa
    const handleMenuClick = () => {
        // Cambiar el valor del estado isOpen al opuesto del actual
        setIsOpen(!isOpen);
    };

    // Devolver el JSX que representa el componente Header
    return (
        <div className="header">
            <nav className="nav">
                <div className="menu">
                    <button className="menu-button" onClick={handleMenuClick}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <div className={`menu-content ${isOpen ? 'open' : 'close'}`}>
                        <ul className="menu-list">
                            <li className="menu-item">Inicio</li>
                            <li className="menu-item">Categoría1</li>
                            <li className="menu-item">Categoría2</li>
                            <li className="menu-item">Categoría3</li>
                            <li className="menu-item">Categoría4</li>
                        </ul>
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