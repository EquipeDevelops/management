const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = require("./db");

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    const usuario = result.rows[0];

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      "secret_key",
      { expiresIn: "1h" }
    );

    res.json({ token, role: usuario.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token não fornecido" });

  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    req.usuarioId = decoded.id;
    req.usuarioRole = decoded.role;
    next();
  });
};

const verificarAdmin = (req, res, next) => {
  if (req.usuarioRole !== "admin") {
    return res.status(403).json({ message: "Acesso negado" });
  }
  next();
};

const verificarProfessor = (req, res, next) => {
  if (req.usuarioRole !== "professor") {
    return res.status(403).json({ message: "Acesso negado" });
  }
  next();
};

const verificarAluno = (req, res, next) => {
  if (req.usuarioRole !== "aluno") {
    return res.status(403).json({ message: "Acesso negado" });
  }
  next();
};

app.get("/admin", verificarToken, verificarAdmin, (req, res) => {
  res.json({ message: "Bem-vindo, Admin!" });
});

app.get("/professor", verificarToken, verificarProfessor, (req, res) => {
  res.json({ message: "Bem-vindo, Professor!" });
});

app.get("/aluno", verificarToken, verificarAluno, (req, res) => {
  res.json({ message: "Bem-vindo, Aluno!" });
});

app.get("/protegido", verificarToken, (req, res) => {
  res.json({
    message: "Rota protegida",
    usuarioId: req.usuarioId,
    role: req.usuarioRole,
  });
});

app.get("/", (req, res) => {
  res.send("Backend da Gestão Escolar está rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get("/alunos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alunos");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.get("/alunos/:id/boletim", async (req, res) => {
  const { id } = req.params;
  try {
    const notas = await pool.query(
      "SELECT disciplinas.nome, notas.nota FROM notas JOIN disciplinas ON notas.disciplina_id = disciplinas.id WHERE notas.aluno_id = $1",
      [id]
    );
    const faltas = await pool.query(
      "SELECT disciplinas.nome, faltas.quantidade FROM faltas JOIN disciplinas ON faltas.disciplina_id = disciplinas.id WHERE faltas.aluno_id = $1",
      [id]
    );
    res.json({ notas: notas.rows, faltas: faltas.rows });
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

app.get("/professores", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM professores");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/professores", async (req, res) => {
  const { nome, cpf, formacao, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO professores (nome, cpf, formacao, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, cpf, formacao, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.get("/disciplinas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM disciplinas");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/disciplinas", async (req, res) => {
  const { nome, carga_horaria } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO disciplinas (nome, carga_horaria) VALUES ($1, $2) RETURNING *",
      [nome, carga_horaria]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.get("/turmas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM turmas");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/turmas", async (req, res) => {
  const { nome, ano, turno } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO turmas (nome, ano, turno) VALUES ($1, $2, $3) RETURNING *",
      [nome, ano, turno]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.get("/notas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notas");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/notas", async (req, res) => {
  const { aluno_id, disciplina_id, nota } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO notas (aluno_id, disciplina_id, nota) VALUES ($1, $2, $3) RETURNING *",
      [aluno_id, disciplina_id, nota]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.get("/faltas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM faltas");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/faltas", async (req, res) => {
  const { aluno_id, disciplina_id, quantidade } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO faltas (aluno_id, disciplina_id, quantidade) VALUES ($1, $2, $3) RETURNING *",
      [aluno_id, disciplina_id, quantidade]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.get("/horarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM horarios");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/horarios", async (req, res) => {
  const { turma_id, disciplina_id, dia_semana, horario_inicio, horario_fim } =
    req.body;
  try {
    const result = await pool.query(
      "INSERT INTO horarios (turma_id, disciplina_id, dia_semana, horario_inicio, horario_fim) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [turma_id, disciplina_id, dia_semana, horario_inicio, horario_fim]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.get("/estatisticas/admin", async (req, res) => {
  try {
    const alunos = await pool.query("SELECT COUNT(*) FROM alunos");
    const professores = await pool.query("SELECT COUNT(*) FROM professores");
    const turmas = await pool.query("SELECT COUNT(*) FROM turmas");
    const disciplinas = await pool.query("SELECT COUNT(*) FROM disciplinas");

    res.json({
      alunos: alunos.rows[0].count,
      professores: professores.rows[0].count,
      turmas: turmas.rows[0].count,
      disciplinas: disciplinas.rows[0].count,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});
app.get("/estatisticas/admin", async (req, res) => {
  try {
    const alunos = await pool.query("SELECT COUNT(*) FROM alunos");
    const professores = await pool.query("SELECT COUNT(*) FROM professores");
    const turmas = await pool.query("SELECT COUNT(*) FROM turmas");
    const disciplinas = await pool.query("SELECT COUNT(*) FROM disciplinas");

    res.json({
      alunos: alunos.rows[0].count,
      professores: professores.rows[0].count,
      turmas: turmas.rows[0].count,
      disciplinas: disciplinas.rows[0].count,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.get("/estatisticas/professor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const turmas = await pool.query(
      "SELECT COUNT(*) FROM turmas WHERE professor_id = $1",
      [id]
    );
    const disciplinas = await pool.query(
      "SELECT COUNT(*) FROM disciplinas WHERE professor_id = $1",
      [id]
    );

    res.json({
      turmas: turmas.rows[0].count,
      disciplinas: disciplinas.rows[0].count,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.get("/estatisticas/aluno/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const notas = await pool.query(
      "SELECT AVG(nota) FROM notas WHERE aluno_id = $1",
      [id]
    );
    const faltas = await pool.query(
      "SELECT SUM(quantidade) FROM faltas WHERE aluno_id = $1",
      [id]
    );

    res.json({
      media_notas: notas.rows[0].avg || 0,
      total_faltas: faltas.rows[0].sum || 0,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.get("/relatorios/alunos-por-turma", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT turmas.nome AS turma, COUNT(alunos.id) AS total_alunos FROM turmas LEFT JOIN alunos ON turmas.id = alunos.turma_id GROUP BY turmas.nome"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

app.get("/relatorios/notas-por-disciplina", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT disciplinas.nome AS disciplina, AVG(notas.nota) AS media_notas FROM disciplinas LEFT JOIN notas ON disciplinas.id = notas.disciplina_id GROUP BY disciplinas.nome"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});
