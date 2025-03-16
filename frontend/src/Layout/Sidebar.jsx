import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import {
  Home,
  People,
  School,
  Class,
  Assignment,
  Book,
  ListAlt,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = ({ userRole, onLogout }) => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {userRole === "admin" && (
          <ListItem button component={Link} to="/alunos">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Alunos" />
          </ListItem>
        )}

        {userRole === "admin" && (
          <ListItem button component={Link} to="/professores">
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText primary="Professores" />
          </ListItem>
        )}

        {userRole === "admin" && (
          <ListItem button component={Link} to="/disciplinas">
            <ListItemIcon>
              <Book />
            </ListItemIcon>
            <ListItemText primary="Disciplinas" />
          </ListItem>
        )}

        {userRole === "admin" && (
          <ListItem button component={Link} to="/turmas">
            <ListItemIcon>
              <Class />
            </ListItemIcon>
            <ListItemText primary="Turmas" />
          </ListItem>
        )}

        {userRole === "professor" && (
          <ListItem button component={Link} to="/notas">
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Notas" />
          </ListItem>
        )}

        {userRole === "professor" && (
          <ListItem button component={Link} to="/faltas">
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Faltas" />
          </ListItem>
        )}

        {userRole === "aluno" && (
          <ListItem button component={Link} to="/boletim">
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Boletim" />
          </ListItem>
        )}
      </List>

      <ListItem button component={Link} to="/horario">
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="Horário" />
      </ListItem>

      <Button
        variant="contained"
        color="secondary"
        onClick={onLogout}
        sx={{ mt: 2, mx: 2 }}
      >
        Logout
      </Button>
    </Drawer>
  );
};

export default Sidebar;
