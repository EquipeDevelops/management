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

const Notas = () => {
  const [notas, setNotas] = useState([]);
  const [novaNota, setNovaNota] = useState({
    aluno_id: "",
    disciplina_id: "",
    nota: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/notas")
      .then((response) => setNotas(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaNota({ ...novaNota, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/notas",
        novaNota
      );
      setNotas([...notas, response.data]);
      setNovaNota({
        aluno_id: "",
        disciplina_id: "",
        nota: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lista de Notas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Aluno ID</TableCell>
              <TableCell>Disciplina ID</TableCell>
              <TableCell>Nota</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notas.map((nota) => (
              <TableRow key={nota.id}>
                <TableCell>{nota.aluno_id}</TableCell>
                <TableCell>{nota.disciplina_id}</TableCell>
                <TableCell>{nota.nota}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Lançar Nova Nota
      </Typography>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Aluno ID"
            name="aluno_id"
            type="number"
            value={novaNota.aluno_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Disciplina ID"
            name="disciplina_id"
            type="number"
            value={novaNota.disciplina_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Nota"
            name="nota"
            type="number"
            value={novaNota.nota}
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

export default Notas;
