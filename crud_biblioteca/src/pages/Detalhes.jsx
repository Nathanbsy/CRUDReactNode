import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { resolveCoverSrc } from "../utils/cover";
import "./Detalhes.css";

function Detalhes() {
  const [livro, setLivro] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/livros/${id}`);
        const data = res.data;
        setLivro(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLivro();
  }, [id]);
  return (
    <div>
      <h1>Detalhes</h1>
      {livro.map((livro) => {
        const coverSrc = resolveCoverSrc(livro.Cover);
        return (
          <div key={livro.IdLivro}>
            <h2>{livro.Titulo}</h2>
            {coverSrc ? (
              <img
                className="detalhes-capa"
                src={coverSrc}
                alt={`Capa de ${livro.Titulo}`}
              />
            ) : (
              <div className="detalhes-capa detalhes-capa--vazia">
                Capa indisponível
              </div>
            )}
            <p>{livro.Descricao}</p>
            <span>R${livro.Preco}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Detalhes;
