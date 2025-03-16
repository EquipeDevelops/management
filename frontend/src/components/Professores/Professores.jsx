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
  Typography,
} from "@mui/material";

const Professores = () => {
  const [professores, setProfessores] = useState([]);
  const [novoProfessor, setNovoProfessor] = useState({
    nome: "",
    cpf: "",
    formacao: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/professores")
      .then((response) => setProfessores(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProfessor({ ...novoProfessor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/professores",
        novoProfessor
      );
      setProfessores([...professores, response.data]);
      setNovoProfessor({
        nome: "",
        cpf: "",
        formacao: "",
        email: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lista de Professores
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Formação</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professores.map((professor) => (
              <TableRow key={professor.id}>
                <TableCell>{professor.nome}</TableCell>
                <TableCell>{professor.cpf}</TableCell>
                <TableCell>{professor.formacao}</TableCell>
                <TableCell>{professor.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Cadastrar Novo Professor
      </Typography>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            name="nome"
            value={novoProfessor.nome}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="CPF"
            name="cpf"
            value={novoProfessor.cpf}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Formação"
            name="formacao"
            value={novoProfessor.formacao}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="E-mail"
            name="email"
            type="email"
            value={novoProfessor.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Cadastrar
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Professores;
