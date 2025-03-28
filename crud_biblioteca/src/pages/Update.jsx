import axios from "axios";
import "./Add.css";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Update.css";

function Update() {
  const [livro, setLivro] = useState({
    titulo: "",
    descricao: "",
    preco: "",
    cover: "",
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idLivro = searchParams.get("id");

  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/livros/${idLivro}`);
        const data = res.data[0];
        setLivro({
          titulo: data.Titulo,
          descricao: data.Descricao,
          preco: data.Preco,
          cover: data.Cover,
        });
      } catch (error) {
        console.log("Erro ao buscar o livro:", error);
      }
    };
    fetchLivro();
  }, [idLivro]);

  function aoDigitar(evento) {
    setLivro((prev) => ({
      ...prev,
      [evento.target.name]: evento.target.value,
    }));
  }

  async function aoAtualizar(evento) {
    evento.preventDefault();
    if (livro.titulo !== "" && livro.descricao !== "" && livro.preco !== "") {
      try {
        await axios.put(`http://localhost:8800/livros/${idLivro}`, livro);
        alert("Livro atualizado com sucesso!");
        navigate("/");
      } catch (error) {
        console.log("Erro ao atualizar o livro:", error);
      }
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <>
      <div className="atualizar">
        <h1>Atualizar livro</h1>
        <div className="formulario">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            maxLength={50}
            value={livro.titulo}
            onChange={aoDigitar}
          />

          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            maxLength={100}
            value={livro.descricao}
            onChange={aoDigitar}
          ></textarea>

          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={livro.preco}
            onChange={aoDigitar}
          />

          <label htmlFor="cover">Capa:</label>
          <input
            type="text"
            id="cover"
            name="cover"
            value={livro.cover}
            onChange={aoDigitar}
          />

          <button className="btn-add" onClick={aoAtualizar}>
            Atualizar
          </button>
        </div>
      </div>
    </>
  );
}

export default Update;
