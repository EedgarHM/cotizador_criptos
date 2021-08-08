import React, {useState,useEffect} from 'react';
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'
import Spinner from './components/Spinner';
import imgCriptos from './criptos.png';
import styled from '@emotion/styled';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue',cursive;
  color: #FFF;
  font-weight: 700;
  font-size: 50px;
  text-align: left;
  margin-bottom:50px ;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, setResultado] = useState ({});
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const cotizarCriptomoneda = async ()=> {
      // Se evita la primer ejecucion
    if (moneda==='') return;
    
    // consultando la api para obtener la cotizacion
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const result = await axios.get(url);
    
    // Mostrando el spinner
    setLoading(true);
    
    // Ocultando el Spinner y mostrando los resultados
      setTimeout(()=>{
        // Cambiando el estado del spinner
        setLoading(false)
        setResultado(result.data.DISPLAY[criptomoneda][moneda]);
      },3000) 
    
 
    
    }
    cotizarCriptomoneda()
  },[moneda,criptomoneda])

  //Mostrar Spinner o resultado
  const Componente = loading ? <Spinner/> :  <Cotizacion resultado={resultado}/>

  return (
   <Contenedor>
     <div>
      <Imagen
        src={imgCriptos}
        alt="imagen criptomonedas"
      />
     </div>
     <div>
      <Heading>Cotiza Criptomonedas Al instante</Heading>
      <Formulario
        guardarMoneda={guardarMoneda}
        guardarCriptomoneda={guardarCriptomoneda}
      />
      {Componente}
     </div>
   </Contenedor>
  );
}

export default App;
