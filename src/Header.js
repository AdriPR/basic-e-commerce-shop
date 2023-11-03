import React, {useState} from 'react';
import {FaBars, FaTimes, FaUserCircle, FaRegUserCircle, FaShoppingCart} from 'react-icons/fa';
import {Link, useLocation} from "react-router-dom";

function Header({categorias, cantidadCarrito}) {

    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };

    const handleLiClick = (e) => {
        const li = e.target.closest('li');
        li.querySelector('a').click();
    }

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
                                <li key="Inicio" className={location.pathname === '/' ? 'selected' : ''} onClick={handleLiClick}>
                                    <Link to="/">Inicio</Link>
                                </li>
                                {categorias.map(categoria => {
                                    const path = categoria.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s/g, "-");

                                    return (
                                        <li key={categoria.id_categoria} className={location.pathname === `/${path}` ? 'selected' : ''} onClick={handleLiClick}>
                                            <Link to={'/'+path}>{categoria.nombre}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button className="btn btn-primary"><FaUserCircle/> Login</button>
                    <button className="btn btn-primary"><FaRegUserCircle/> Registrarse</button>
                    <Link to="/carrito" className="btn btn-primary">
                        <FaShoppingCart/> Carrito ({cantidadCarrito})
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Header;