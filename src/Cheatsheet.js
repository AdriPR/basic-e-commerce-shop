import React from 'react';

function Cheatsheet({onClose}) {
    return (
        <div className="popup">
            <div className="popup-content cheatsheet"
            >
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <div>
                    <h2>Cheatsheet</h2>
                    <p>Flag 1: Inyección SQL. Uso de sentencia con operador "LIKE". Un cliente puede acceder al servicio MySQL.</p>
                    <p>Flag 2: FTP.</p>
                    <p>Flag 3: Fuerza bruta. Tres datos sobre Gabbro. Orden en el e-mail de Chert.</p>
                    <p>Flag 4: Root. Vim. GTFObins.</p>
                </div>
            </div>
        </div>
    );
}

export default Cheatsheet;