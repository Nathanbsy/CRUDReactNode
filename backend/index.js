import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "EU",
    password: "S4r!nh4",
    database: "dbBiblioteca",
    insecureAuth: true
});

app.use(express.json());
app.use(cors());

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

app.post("/livros", (req, res) => {
    const q = `INSERT INTO tbLivros (Titulo, Descricao, Preco, Cover) VALUES (?)`;
    const values = [
        req.body.titulo,
        req.body.descricao,
        req.body.preco,
        req.body.cover
    ];
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

app.delete("/livros/:id", (req, res) => {
    const q = `DELETE FROM tbLivros WHERE IdLivro = ${req.params.id}`;
    //Pega a conexão
    db.getConnection((err, connection) => {
        if(err) {
            console.error("Erro ao obter conexão:", err);
            return res.status(500).json({ error: "Erro de conexão com o banco de dados" });
        }
        connection.query(q, (err, resultado) => {
            connection.release();
            if(err) return res.json(err);
            return res.json("O livro foi excluído com sucesso!");   
        });
    });
});

app.put("/livros/:id", (req, res) => {
    const q = `UPDATE tbLivros SET Titulo = ?, Descricao = ?, Preco = ?, Cover = ? WHERE IdLivro = ${req.params.id}`;
    const values = [
        req.body.titulo,
        req.body.descricao,
        req.body.preco,
        req.body.cover
    ];
    db.getConnection((err, connection) => {
        if(err) {
            console.error("Erro ao obter conexão:", err);
            return res.status(500).json({ error: "Erro de conexão com o banco de dados" });
        }
        connection.query(q, values, req.body.id, (err, resultado) => {
            connection.release();
            if(err) return res.json(err);
            return res.json("O livro foi atualizado com sucesso!");   
        });
    });
});

app.get("imagem/:id", (req, res) => {
    const q = `SELECT Cover FROM tbLivros WHERE IdLivro = ${req.params.id}`;
    db.getConnection((err, connection) => {
        if(err) {
            console.log("Erro ao obter a conexão:", err);
            return res.status(500).json({ error: "Erro de conexão com o banco de dados" });
        }
        connection.query(q, (err, resultado) => {
            connection.release();
            return res.json(resultado);
        })
    })
})

app.listen(8800, () => {
    console.log("Conectado ao backend!");
});
