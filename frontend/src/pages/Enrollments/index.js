import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';

import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import history from '~/services/history';

import { Container, Content, EnrollmentTable } from './styles';

import ButtonRegister from '~/components/ButtonRegister';

import {
  loadAllEnrollmentsRequest,
  deleteEnrollmentRequest,
} from '../../store/modules/enrollment/actions';

export default function Enrollments() {
  const dispatch = useDispatch();
  const enrollments =
    useSelector(state => state.enrollment.allEnrollments) || [];

  useEffect(() => {
    dispatch(loadAllEnrollmentsRequest());
  }, []); // eslint-disable-line

  useEffect(() => { }, [enrollments]); // eslint-disable-line

  function handleDelete(id) {
    const result = window.confirm(
      'Tem certeza que deseja deletar essa matrícula?'
    );
    if (result) {
      dispatch(deleteEnrollmentRequest(id));
    }
  }

  function formatDate(date) {
    const formattedDate = format(parseISO(date), "d 'de' MMMM 'de' yyyy", {
      locale: pt,
    });
    return formattedDate;
  }

  return (
    <Container>
      <Content>
        <header>
          <h1>Gerenciando matrículas</h1>
          <ButtonRegister
            type="button"
            onClick={() => history.push('/enrollments/register')}
          />
        </header>

        <EnrollmentTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVO</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(enrollment => (
              <tr key={enrollment.id}>
                <td>{enrollment.student.name}</td>
                <td>{enrollment.plan.title}</td>
                <td>{formatDate(enrollment.start_date)}</td>
                <td>{formatDate(enrollment.end_date)}</td>
                <td>
                  {enrollment.active ? (
                    <MdCheckCircle color="#42cb59" size={20} />
                  ) : (
                    <MdCheckCircle color="#ddd" size={20} />
                  )}
                </td>
                <td>
                  <div>
                    <Link
                      to={{
                        pathname: `/enrollments/edit/${enrollment.id}`,
                      }}
                    >
                      editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(enrollment.id)}
                    >
                      apagar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </EnrollmentTable>
      </Content>
    </Container>
  );
}
