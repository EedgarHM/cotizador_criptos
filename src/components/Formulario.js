import React, {useEffect,useState} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';



const Boton = styled.input`
    margin-top:20px ;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
    // Listado de criptomonedas
    const [listacripto, setCriptomonedas] = useState([]);
    const [error, setError] = useState(false);


    const MONEDAS = [
        {codigo:'USD',nombre:'Dolar de Estados Unidos'},
        {codigo:'MNX',nombre:'Peso Mexicano'},
        {codigo:'EUR',nombre:'Euro'},
        {codigo:'GBP',nombre:'Libra Esterlina'}];

    // Utilizando nuestro hook
    const [moneda,SelectMonedas] = useMoneda('Elige tu moneda','',MONEDAS);

    // utilizar useCriptomonedas
    const [criptomoneda,SelectCripto] = useCriptomoneda('Elige la criptomoneda','',listacripto);

    // Llaando a la API
    useEffect(()=>{
        const getApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result = await axios.get(url);
            setCriptomonedas(result.data.Data);
        }
        getApi()
    },[]);

    // Cuando el usuario hace submit

    const cotizarMoneda = (e) => {
        e.preventDefault();

        //  Validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda ===''){
            setError(true);
            return;
        }
        //  Pasar los datos al componente principal
        setError(false);

        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }
    return (  
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje ="Todos los campos son obligatorios"/> : null}
            <SelectMonedas/>
            <SelectCripto/>
            <Boton type="submit" value="Calcular"/>
        </form>
    );
}
 
export default Formulario;