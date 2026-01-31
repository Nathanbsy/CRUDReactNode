import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Livros.css";
import imagemRammusJoinha from "../assets/rammusjoinha.png";
import { resolveCoverSrc } from "../utils/cover";

function Livros() {
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

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

  function detalhesLivro(id) {
    const query = new URLSearchParams();
    query.set("id", id);
    navigate(`/detalhes?${query.toString()}`);
  }

  async function onDelete(id) {
    try {
      await axios.delete(`http://localhost:8800/livros/${id}`);
      alert("Livro excluído com sucesso!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function onUpdate(id) {
    const query = new URLSearchParams();
    query.set("id", id);
    navigate(`/update?${query.toString()}`);
  }



  return (
    <>
      <main>
        <div className="titulo">
          <h1>Rammus Livraria</h1>
          <img src={imagemRammusJoinha} alt="" />
        </div>

        <div className="livros">
          {livros.map((livro) => {
            const coverSrc = resolveCoverSrc(livro.Cover);
            return (
              <div
                key={livro.IdLivro}
                className="livro"
                onClick={() => {
                  detalhesLivro(livro.IdLivro);
                }}
              >
                <div className="livro-info">
                  <div id="imgLivro">
                    {coverSrc ? (
                      <img src={coverSrc} alt={`Capa de ${livro.Titulo}`} />
                    ) : (
                      <div className="livro-capa livro-capa--vazia">
                        Capa indisponível
                      </div>
                    )}
                  </div>
                  <h2>{livro.Titulo}</h2>
                  <p>{livro.Descricao}</p>
                  <span>R${livro.Preco}</span>
                </div>
                <div className="livro-botoes">
                  <button
                    className="btn-delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(livro.IdLivro);
                    }}
                  >
                    Excluir
                  </button>
                  <button
                    className="btn-update"
                    onClick={(event) => {
                      event.stopPropagation();
                      onUpdate(livro.IdLivro);
                    }}
                  >
                    Atualizar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="botao">
          <button className="btn-add">
            <Link to={"/add"}>Adicionar novo livro</Link>
          </button>
        </div>
      </main>
    </>
  );
}

export default Livros;
