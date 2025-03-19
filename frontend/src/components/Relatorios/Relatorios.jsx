import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Relatorios = () => {
  const [alunosPorTurma, setAlunosPorTurma] = useState([]);
  const [notasPorDisciplina, setNotasPorDisciplina] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alunosResponse = await axios.get(
          "http://localhost:5000/relatorios/alunos-por-turma"
        );
        setAlunosPorTurma(alunosResponse.data);

        const notasResponse = await axios.get(
          "http://localhost:5000/relatorios/notas-por-disciplina"
        );
        setNotasPorDisciplina(notasResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Relatórios
      </Typography>

      <Typography variant="h5" gutterBottom>
        Alunos por Turma
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Turma</TableCell>
              <TableCell>Total de Alunos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunosPorTurma.map((row) => (
              <TableRow key={row.turma}>
                <TableCell>{row.turma}</TableCell>
                <TableCell>{row.total_alunos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Média de Notas por Disciplina
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Disciplina</TableCell>
              <TableCell>Média de Notas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notasPorDisciplina.map((row) => (
              <TableRow key={row.disciplina}>
                <TableCell>{row.disciplina}</TableCell>
                <TableCell>{row.media_notas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Relatorios;
