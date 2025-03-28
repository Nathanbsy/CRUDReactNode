import axios from "axios";
import "./Add.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
    const [livro, setLivro] = useState({
        titulo: "",
        descricao: "",
        preco: null,
        cover: "",
    });

    const navigate = useNavigate();

    function aoDigitar(evento) {
        setLivro((prev) => ({...prev, [evento.target.name]: evento.target.value}));
    }
    
    async function aoAdicionar(evento) {
        evento.preventDefault();
        try {
            await axios.post("http://localhost:8800/livros", livro);
            alert("Livro adicionado com sucesso!");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    console.log(livro);
    
  return (
    <>
      <div className="formulario">
        <h1>Adicionar novo livro</h1>

        <label htmlFor="titulo">Título:</label>
        <input type="text" id="titulo" name="titulo" maxLength={50} onChange={aoDigitar} required/>
        <label htmlFor="descricao">Descrição:</label>
        <textarea id="descricao" name="descricao" maxLength={100} onChange={aoDigitar}></textarea>
        <label htmlFor="preco">Preço:</label>
        <input type="number" id="preco" name="preco" onChange={aoDigitar}/>
        <label htmlFor="cover">Capa:</label>
        <input type="text" id="cover" name="cover" onChange={aoDigitar}/>
        <button onClick={aoAdicionar}>Adicionar</button>
      </div>
    </>
  );
}

export default Add;
