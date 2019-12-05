import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';

import Input from '~/components/Input';
import ButtonRegister from '~/components/ButtonRegister';

import { Container, Search, ListStudents } from './styles';

import api from '~/services/api';
import history from '~/services/history';

import { deleteStudentRequest } from '../../store/modules/student/actions';

export default function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function handleStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    handleStudents();
  }, []);

  async function handleDelete(id) {
    const result = window.confirm('Tem certeza que deseja apagar esse aluno?');
    if (result) {
      dispatch(deleteStudentRequest(id));
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

  async function handleStudentSearch(e) {
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
              checked={search}
              onChange={handleStudentSearch}
              name="search"
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
                <td>{student.age}</td>
                <td>
                  <div>
                    <Link
                      to={{
                        pathname: `/students/edit/${student.id}`,
                      }}
                    >
                      editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(student.id)}
                    >
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
