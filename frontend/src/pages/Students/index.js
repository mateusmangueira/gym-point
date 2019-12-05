import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { MdSearch } from 'react-icons/md';

import Input from '~/components/Input';
import ButtonRegister from '~/components/ButtonRegister';

import history from '~/services/history';
import { Container, Search, ListStudents } from './styles';

import {
  handleStudentsRequest,
  deleteStudentRequest,
} from '../../store/modules/student/actions';

export default function Students() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.student.students) || [];
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(handleStudentsRequest(null, 1));
  }, []); // eslint-disable-line

  useEffect(() => {
    if (search !== null) {
      dispatch(handleStudentsRequest(search, null));
    }
  }, [search]); // eslint-disable-line

  function handleDelete(id) {
    const result = window.confirm('Tem certeza que deseja excluir esse campo?');
    if (result) {
      dispatch(deleteStudentRequest(id));
    }
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
              onChange={e => setSearch(e.target.value)}
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
                        pathname: `/students/edit/${student.name}`,
                      }}
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(student.id)}
                    >
                      Apagar
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
