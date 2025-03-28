import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Livros.css";

function Livros() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const res = await axios.get("http://localhost:8800/livros");
        const data = res.data;
        setLivros(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLivros();
  }, []);
  return (
    <>
      <h1>Rammus Livraria</h1>
      <main>
        <div className="livros">
          {livros.map((livro) => (
            <div key={livro.IdLivro} className="livro">
              {livro.cover && <img src={livro.Cover} alt={livro.Titulo} />}
              <h2>{livro.Titulo}</h2>
              <p>{livro.Descricao}</p>
              <span>R${livro.Preco}</span>
            </div>
          ))}
        </div>
        <button className="btn-add"><Link to={"/add"}>Adicionar novo livro</Link></button>
      </main>
    </>
  );
}

export default Livros;
