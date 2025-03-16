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

const Turmas = () => {
  const [turmas, setTurmas] = useState([]);
  const [novaTurma, setNovaTurma] = useState({
    nome: "",
    ano: "",
    turno: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/turmas")
      .then((response) => setTurmas(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaTurma({ ...novaTurma, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/turmas",
        novaTurma
      );
      setTurmas([...turmas, response.data]);
      setNovaTurma({
        nome: "",
        ano: "",
        turno: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lista de Turmas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Ano</TableCell>
              <TableCell>Turno</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {turmas.map((turma) => (
              <TableRow key={turma.id}>
                <TableCell>{turma.nome}</TableCell>
                <TableCell>{turma.ano}</TableCell>
                <TableCell>{turma.turno}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Cadastrar Nova Turma
      </Typography>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            name="nome"
            value={novaTurma.nome}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Ano"
            name="ano"
            type="number"
            value={novaTurma.ano}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Turno"
            name="turno"
            value={novaTurma.turno}
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

export default Turmas;
