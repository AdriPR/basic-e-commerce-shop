import React from 'react';
import eyeImage from '/public/eye.png';

function EyeOfTheUniverse({onClose}) {
    return (
        <div className="popup">
            <div className="popup-content eye"
            >
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <div>
                    <img src={eyeImage} style={
                        {width: "90%", height: "90%"}

                    } alt="Ojo del Universo"/>
                    <div>
                        <p>{"El Ojo del Universo te ha concedido el conocimiento necesario para completar el CTF."}</p>
                        <p>{"¡Gracias por participar!"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EyeOfTheUniverse;