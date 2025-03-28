import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "EU",
    password: "S4r!nh4",
    database: "dbBiblioteca",
    insecureAuth: true
});

app.get("/", (req, res) => {
    res.json("Olá, mundo!");
});

app.get("/livros", (req, res) => {
    const q = "SELECT * FROM tbLivros";
    //Pega a conexão
    db.getConnection((err, connection) => {
        //Verifica se houve erro
        if (err) {
            console.error("Erro ao obter conexão:", err);
            return res.status(500).json({ error: "Erro de conexão com o banco de dados" });
        }
        //Se não houve erro, executa a query
        connection.query(q, (err, resultado) => {
            connection.release(); // Libera a conexão de volta para o pool
            if (err) return res.json(err);

            return res.json(resultado);
        });
    });
});

app.get("/livros/:id", (req, res) => {
    const q = `SELECT * FROM tbLivros WHERE IdLivro = ${req.params.id}`;
    //Pega a conexão
    db.getConnection((err, connection) => {
        //Verifica se houve erro
        if (err) {
            console.error("Erro ao obter conexão:", err);
            return res.status(500).json({ error: "Erro de conexão com o banco de dados" });
        }
        //Se não houve erro, executa a query
        connection.query(q, (err, resultado) => {
            connection.release(); // Libera a conexão de volta para o pool
            if (err) return res.json(err);
            if(resultado == "") return res.json({error: "Livro não encontrado"});
            return res.json(resultado);
        });
    });
});

app.post("/books", (req, res) => {
    const q = `INSERT INTO tbLivros (Titulo, Descricao, Cover) VALUES (?)`;
    const values = ["title from backend", "description from backend", "cover pic from backend"];
    //Pega a conexão
    db.getConnection((err, connection) => {
        if(err) {
            console.error("Erro ao obter conexão:", err);
            return res.status(500).json({ error: "Erro de conexão com o banco de dados" });
        }
        connection.query(q, [values], (err, resultado) => {
            connection.release();
            if(err) return res.json(err);
            return res.json("O livro foi cadastrado com sucesso!");   
        });
    });
});

app.listen(8800, () => {
    console.log("Conectado ao backend!");
});
