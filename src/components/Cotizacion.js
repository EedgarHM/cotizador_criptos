import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: 'Courier New', Courier, monospace;
`;

const SimboloMoneda = styled.h3`
    color: red;
    text-align: center;
`;
const Info = styled.p`
    font-size: 18px;

    span{
        font-weight: bold;
    }
`;

const Precio = styled.p`
    span{
        font-weight: bold;
        font-size: 20px;
    }
    `;
const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length===0) return null;
    console.log(resultado)
    return ( 
        <ResultadoDiv>
            <SimboloMoneda>{resultado.FROMSYMBOL}</SimboloMoneda>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio mas alto del dia: <span>{resultado.HIGHDAY} </span></Info>
            <Info>Precio mas bajo del dia: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variacion en las ultimas 24 hrs. : <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima Actualizacion: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
     );
}
 
export default Cotizacion;