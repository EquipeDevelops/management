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
  Typography,
} from "@mui/material";

const Horario = () => {
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/horarios")
      .then((response) => setHorarios(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Horário das Aulas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Turma</TableCell>
              <TableCell>Disciplina</TableCell>
              <TableCell>Dia da Semana</TableCell>
              <TableCell>Horário de Início</TableCell>
              <TableCell>Horário de Término</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {horarios.map((horario) => (
              <TableRow key={horario.id}>
                <TableCell>{horario.turma_id}</TableCell>
                <TableCell>{horario.disciplina_id}</TableCell>
                <TableCell>{horario.dia_semana}</TableCell>
                <TableCell>{horario.horario_inicio}</TableCell>
                <TableCell>{horario.horario_fim}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Horario;
