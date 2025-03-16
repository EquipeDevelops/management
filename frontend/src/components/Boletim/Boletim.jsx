import React, { useState } from "react";
import axios from "axios";
import {
  Paper,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Boletim = () => {
  const [alunoId, setAlunoId] = useState("");
  const [boletim, setBoletim] = useState(null);

  const handleInputChange = (e) => {
    setAlunoId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/alunos/${alunoId}/boletim`
      );
      setBoletim(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Boletim do Aluno
      </Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="ID do Aluno"
            type="number"
            value={alunoId}
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
            Buscar
          </Button>
        </form>
      </Paper>

      {boletim && (
        <div>
          <Typography variant="h5" gutterBottom>
            Notas
          </Typography>
          <List>
            {boletim.notas.map((nota, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${nota.nome}: ${nota.nota}`} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Faltas
          </Typography>
          <List>
            {boletim.faltas.map((falta, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${falta.nome}: ${falta.quantidade} faltas`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default Boletim;
