import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';
import history from '~/services/history';

import { Container, Content, EnrollmentTable } from './styles';

import ButtonRegister from '~/components/ButtonRegister';

import { deleteEnrollmentRequest } from '../../store/modules/enrollment/actions';

export default function Enrollments() {
  const dispatch = useDispatch();
  const [enrollments, setEnrollments] = useState([]);

  async function handleEnrollments() {
    const response = await api.get('enrolls');

    const data = response.data.map(enrollment => {
      enrollment.startDateFormated = format(
        parseISO(enrollment.start_date),
        "dd 'de' MMMM 'de' yyyy",
        { locale: pt }
      );
      enrollment.endDateFormated = format(
        parseISO(enrollment.end_date),
        "dd 'de' MMMM 'de' yyyy",
        { locale: pt }
      );
      return enrollment;
    });

    setEnrollments(data);
  }

  useEffect(() => {
    handleEnrollments();
  }, []);

  function handleDelete(id) {
    const result = window.confirm(
      'Tem certeza que deseja deletar essa matrícula?'
    );
    if (result) {
      dispatch(deleteEnrollmentRequest(id));
    }
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
                <td>{enrollment.startDateFormated}</td>
                <td>{enrollment.endDateFormated}</td>
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
