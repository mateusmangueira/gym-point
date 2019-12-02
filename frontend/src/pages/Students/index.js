import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { MdSearch } from 'react-icons/md';

import Input from '~/components/Input';
import ButtonRegister from '~/components/ButtonRegister';

import api from '~/services/api';
import history from '~/services/history';
import { Container, Search, ListStudents } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function handleStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    handleStudents();
  }, []);

  async function handleDelete({ name, id }) {
    const confirm = window.confirm(`Deseja mesmo apagar o aluno, ${name} ?`);

    if (!confirm) {
      toast.error('Aluno não apagado');
      return;
    }

    try {
      await api.delete(`students/${id}`);
      const response = await api.get('students');
      setStudents(response.data);

      toast.success('Aluno apagado com sucesso!');
    } catch (error) {
      toast.error('Aluno tem uma matrícula ativa');
    }
  }

  useMemo(() => {
    async function getStudent() {
      const response = await api.get('students', {
        params: {
          q: search,
        },
      });

      setStudents(response.data);
    }

    getStudent();
  }, [search]);

  async function handleSearchStudent(e) {
    setSearch(e.target.value);
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>
        <div>
          <ButtonRegister
            type="button"
            onClick={() => {
              history.push('/students/register');
            }}
          />
          <Search>
            <MdSearch color="#999" size={16} />
            <Input
              onChange={handleSearchStudent}
              name="aluno"
              type="text"
              placeholder="Buscar aluno"
            />
          </Search>
        </div>
      </header>

      <ListStudents>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.idade}</td>
                <td>
                  <div>
                    <Link
                      to={{
                        pathname: `/students/edit/${student.name}`,
                      }}
                    >
                      editar
                    </Link>
                    <button type="button" onClick={() => handleDelete(student)}>
                      apagar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ListStudents>
    </Container>
  );
}
