import React, { useState } from "react";
import axios from "axios";

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    endereco: "",
    telefone: "",
    email: "",
    turma_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoAluno({ ...novoAluno, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/alunos",
        novoAluno
      );
      setAlunos([...alunos, response.data]);
      setNovoAluno({
        nome: "",
        cpf: "",
        data_nascimento: "",
        endereco: "",
        telefone: "",
        email: "",
        turma_id: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Lista de Alunos</h1>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id}>
            {aluno.nome} - {aluno.email}
          </li>
        ))}
      </ul>

      <h2>Cadastrar Novo Aluno</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoAluno.nome}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={novoAluno.cpf}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="data_nascimento"
          placeholder="Data de Nascimento"
          value={novoAluno.data_nascimento}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={novoAluno.endereco}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={novoAluno.telefone}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={novoAluno.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="turma_id"
          placeholder="ID da Turma"
          value={novoAluno.turma_id}
          onChange={handleInputChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Alunos;
