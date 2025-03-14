const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend da Gestão Escolar está rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const pool = require("./db");

// Rota para listar todos os alunos
app.get("/alunos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alunos");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/alunos", async (req, res) => {
  const { nome, cpf, data_nascimento, endereco, telefone, email, turma_id } =
    req.body;
  try {
    const result = await pool.query(
      "INSERT INTO alunos (nome, cpf, data_nascimento, endereco, telefone, email, turma_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [nome, cpf, data_nascimento, endereco, telefone, email, turma_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});
