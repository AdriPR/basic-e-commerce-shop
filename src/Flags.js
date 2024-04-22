import React, { useState } from 'react';
import background from '/public/OW.jpg'
import EyeOfTheUniverse from "./EyeOfTheUniverse";

function Flags() {
    const [inputText, setInputText] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleInputSubmit = (event) => {
        event.preventDefault();
        let validFlags = 0;
        if(inputText.includes('Welcome')){
            validFlags++;
        }
        if(inputText.includes('to')){
            validFlags++;
        }
        if(inputText.includes('Outer Wilds')){
            validFlags++;
        }
        if(inputText.includes('Ventures')){
            validFlags++;
        }
        if (validFlags === 4) {
            if(inputText === 'Welcome to Outer Wilds Ventures'){
                setIsValid(true);
            }else{
                alert('¡Casi! Revisa el orden de las coordenadas');
            }
        } else {
            alert(`${validFlags}/4 coordenadas correctas`);
        }
    };

    return (
        <div className="flags-container" style={{ backgroundImage: `url(${background})`}}>
            <h1>Introduce las coordenadas al Ojo del Universo</h1>
            <form onSubmit={handleInputSubmit}>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                />
                <button className="btn btn-primary" type="submit">Enviar</button>
            </form>
            {isValid && <EyeOfTheUniverse onClose={() => setIsValid(false)}/>}
        </div>
    );
}

export default Flags;