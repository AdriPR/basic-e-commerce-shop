import React from "react";

function Body({categorias}) {

    //Get selected categoria
    const selectedCategoria = categorias.find(categoria => categoria.selected);

    //return a print of the selected categoria, if there is one, or a default message
    return (
        <div className="body">
            {selectedCategoria ? (
                <h1>{selectedCategoria.nombre_categoria}</h1>
            ) : (
                <h1>Seleccione una categoria</h1>
            )}
        </div>
    );
}

export default Body;