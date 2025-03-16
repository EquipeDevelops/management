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

const Faltas = () => {
  const [faltas, setFaltas] = useState([]);
  const [novaFalta, setNovaFalta] = useState({
    aluno_id: "",
    disciplina_id: "",
    quantidade: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/faltas")
      .then((response) => setFaltas(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaFalta({ ...novaFalta, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/faltas",
        novaFalta
      );
      setFaltas([...faltas, response.data]);
      setNovaFalta({
        aluno_id: "",
        disciplina_id: "",
        quantidade: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lista de Faltas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Aluno ID</TableCell>
              <TableCell>Disciplina ID</TableCell>
              <TableCell>Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faltas.map((falta) => (
              <TableRow key={falta.id}>
                <TableCell>{falta.aluno_id}</TableCell>
                <TableCell>{falta.disciplina_id}</TableCell>
                <TableCell>{falta.quantidade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Lançar Nova Falta
      </Typography>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Aluno ID"
            name="aluno_id"
            type="number"
            value={novaFalta.aluno_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Disciplina ID"
            name="disciplina_id"
            type="number"
            value={novaFalta.disciplina_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Quantidade"
            name="quantidade"
            type="number"
            value={novaFalta.quantidade}
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
            Lançar
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Faltas;
