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

const Disciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [novaDisciplina, setNovaDisciplina] = useState({
    nome: "",
    carga_horaria: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/disciplinas")
      .then((response) => setDisciplinas(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaDisciplina({ ...novaDisciplina, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/disciplinas",
        novaDisciplina
      );
      setDisciplinas([...disciplinas, response.data]);
      setNovaDisciplina({
        nome: "",
        carga_horaria: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lista de Disciplinas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Carga Horária</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {disciplinas.map((disciplina) => (
              <TableRow key={disciplina.id}>
                <TableCell>{disciplina.nome}</TableCell>
                <TableCell>{disciplina.carga_horaria} horas</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Cadastrar Nova Disciplina
      </Typography>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            name="nome"
            value={novaDisciplina.nome}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Carga Horária"
            name="carga_horaria"
            type="number"
            value={novaDisciplina.carga_horaria}
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

export default Disciplinas;
