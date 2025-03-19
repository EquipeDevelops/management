import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Layout/Sidebar";
import Alunos from "./components/Alunos/Alunos";
import Professores from "./components/Professores/Professores";
import Disciplinas from "./components/Disciplinas/Disciplinas";
import Turmas from "./components/Turmas/Turmas";
import Notas from "./components/Notas/Notas";
import Faltas from "./components/Faltas/Faltas";
import Boletim from "./components/Boletim/Boletim";
import Login from "./auth/Login";
import Horario from "./components/Horario/Horario";
import Dashboard from "./components/Dashboard/Dashboard";
import Relatorios from "./components/Relatorios/Relatorios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLogin = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {isAuthenticated && (
          <Sidebar userRole={userRole} onLogout={handleLogout} />
        )}

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />

            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <h1>Bem-vindo ao Sistema de Gestão Escolar</h1>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/alunos"
              element={
                isAuthenticated && userRole === "admin" ? (
                  <Alunos />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/professores"
              element={
                isAuthenticated && userRole === "admin" ? (
                  <Professores />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/disciplinas"
              element={
                isAuthenticated && userRole === "admin" ? (
                  <Disciplinas />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/turmas"
              element={
                isAuthenticated && userRole === "admin" ? (
                  <Turmas />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/notas"
              element={
                isAuthenticated && userRole === "professor" ? (
                  <Notas />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/faltas"
              element={
                isAuthenticated && userRole === "professor" ? (
                  <Faltas />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/boletim"
              element={
                isAuthenticated && userRole === "aluno" ? (
                  <Boletim />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/horario"
              element={isAuthenticated ? <Horario /> : <Navigate to="/login" />}
            />

            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard
                    userRole={userRole}
                    userId={userRole === "aluno" ? "studentId" : "defaultId"}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/relatorios"
              element={
                isAuthenticated ? <Relatorios /> : <Navigate to="/login" />
              }
            />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
