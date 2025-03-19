import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Paper, Grid } from "@mui/material";

const Dashboard = ({ userRole, userId }) => {
  const [estatisticas, setEstatisticas] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (userRole === "admin") {
          response = await axios.get(
            "http://localhost:5000/estatisticas/admin"
          );
        } else if (userRole === "professor") {
          response = await axios.get(
            `http://localhost:5000/estatisticas/professor/${userId}`
          );
        } else if (userRole === "aluno") {
          response = await axios.get(
            `http://localhost:5000/estatisticas/aluno/${userId}`
          );
        }
        setEstatisticas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userRole, userId]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {userRole === "admin" && (
          <>
            <Grid item xs={12} md={6} lg={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Alunos</Typography>
                <Typography variant="h4">{estatisticas.alunos}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Professores</Typography>
                <Typography variant="h4">{estatisticas.professores}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Turmas</Typography>
                <Typography variant="h4">{estatisticas.turmas}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Disciplinas</Typography>
                <Typography variant="h4">{estatisticas.disciplinas}</Typography>
              </Paper>
            </Grid>
          </>
        )}

        {userRole === "professor" && (
          <>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Turmas</Typography>
                <Typography variant="h4">{estatisticas.turmas}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Disciplinas</Typography>
                <Typography variant="h4">{estatisticas.disciplinas}</Typography>
              </Paper>
            </Grid>
          </>
        )}

        {userRole === "aluno" && (
          <>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Média de Notas</Typography>
                <Typography variant="h4">{estatisticas.media_notas}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total de Faltas</Typography>
                <Typography variant="h4">
                  {estatisticas.total_faltas}
                </Typography>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default Dashboard;
