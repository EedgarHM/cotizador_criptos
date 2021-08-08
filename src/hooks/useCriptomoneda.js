import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;
const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
`;

const useCriptomoneda = (label,stateInicial,opciones) => {
    

    // State de nuestro hook
    const [state,setState] = useState(stateInicial);
    
    const SeleccionarCripto = () =>(
        <Fragment>
            <Label>{label}</Label>
            <Select onChange={e => setState(e.target.value)}
                value={state}
            >
                <option value="MXN">-- Seleccione --</option>
                {opciones.map(opcion =>(
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name} >{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    )

    // Retornar state, interfaz y funcion que modifica el estado

    return [state,SeleccionarCripto,setState];
}

export default useCriptomoneda;