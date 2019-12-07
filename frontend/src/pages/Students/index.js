import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';

import Input from '~/components/Input';
import ButtonRegister from '~/components/ButtonRegister';

import history from '../../services/history';

import { Container, Search, ListStudents } from './styles';

import {
  deleteStudentRequest,
  loadAllStudentsRequest,
} from '../../store/modules/student/actions';

export default function Students() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.student.allStudents);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(loadAllStudentsRequest());
  }, []); // eslint-disable-line

  useEffect(() => {
    if (search !== null) {
      dispatch(loadAllStudentsRequest(search, null));
    }
  }, [search]); // eslint-disable-line

  async function handleDelete(id) {
    const result = window.confirm('Tem certeza que deseja apagar esse aluno?');
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
