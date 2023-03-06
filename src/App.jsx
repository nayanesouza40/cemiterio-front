import { useState, useEffect } from 'react'
import './App.css'
import blogFetch from './model/axios'

function App() {

  const [nome, setNome] = useState();
  const [data, setData] = useState();
 

  const [resultado, setResultado] = useState([]);
  const getResultado = async () => {
    try {
      const response = await blogFetch.get("/pessoa");

      const data = response.data.data;
    
      setResultado(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResultado();
  }, []);

  const [texto, setTexto] = useState();

  function busca(event) {
    event.preventDefault();
    const resposta = resultado.find((usu) => ((usu.nome == nome)&&(usu.data_morte)));
    console.log(resposta)
    console.log(resposta.nome);
    setTexto(
      <>
      <p>Nome: {resposta.nome}</p>
      <p>Data de nascimento: {resposta.data_nascimento}</p>
      <p>Data de morte: {resposta.data_morte}</p>
      <p>Obituário: {resposta.texto_ob}</p>
      </>);
  }

  return (
    <>
      <h2>Cemitério</h2>
      <form onSubmit={(event) => busca(event)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" onChange={(event) => setNome(event.target.value)}/>
        </div>
        <div>
          <label htmlFor="data_morte">Data de falescimento</label>
          <input type="date" id="data_morte" onChange={(event) => setData(event.target.value)}/>
        </div>
        <button type="submit">Procurar</button>
      </form>

      <div>{texto}</div>

    </>
  )
}

export default App
