import React from 'react';

function Categorias({categorias, setCategorias}) {

    //Change categoria.selected to true on click
    const handleClick = (e) => {
        const updatedCategorias = categorias.map(categoria => {
            if (categoria.nombre_categoria === e.target.innerText) {
                return { ...categoria, selected: true };
            } else {
                return { ...categoria, selected: false };
            }
        });
        setCategorias(updatedCategorias);
    };

    // change all categorias.selected to false
    const resetCategorias = () => {
        const resetCategorias = categorias.map(categoria => {
            return { ...categoria, selected: false };
        });
        setCategorias(resetCategorias);
    };

    return (
        <div className="categorias">
            <ul className="categorias-list">
                <li key="Inicio" className={categorias.every(categoria => !categoria.selected) ? 'selected' : ''}>
                    <a onClick={resetCategorias}>Inicio</a>
                </li>
                {categorias.map(categoria => (
                    <li key={categoria.id_categoria} className={categoria.selected ? 'selected' : ''}>
                        <a onClick={handleClick}>{categoria.nombre_categoria}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categorias;
