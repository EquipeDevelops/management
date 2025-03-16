import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    endereco: "",
    telefone: "",
    email: "",
    turma_id: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/alunos")
      .then((response) => setAlunos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoAluno({ ...novoAluno, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/alunos",
        novoAluno
      );
      setAlunos([...alunos, response.data]);
      setNovoAluno({
        nome: "",
        cpf: "",
        data_nascimento: "",
        endereco: "",
        telefone: "",
        email: "",
        turma_id: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Lista de Alunos</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Turma ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos.map((aluno) => (
              <TableRow key={aluno.id}>
                <TableCell>{aluno.nome}</TableCell>
                <TableCell>{aluno.cpf}</TableCell>
                <TableCell>{aluno.email}</TableCell>
                <TableCell>{aluno.turma_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>Cadastrar Novo Aluno</h2>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            name="nome"
            value={novoAluno.nome}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="CPF"
            name="cpf"
            value={novoAluno.cpf}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Data de Nascimento"
            name="data_nascimento"
            type="date"
            value={novoAluno.data_nascimento}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Endereço"
            name="endereco"
            value={novoAluno.endereco}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Telefone"
            name="telefone"
            value={novoAluno.telefone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="E-mail"
            name="email"
            type="email"
            value={novoAluno.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Turma ID"
            name="turma_id"
            type="number"
            value={novoAluno.turma_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Cadastrar
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Alunos;
