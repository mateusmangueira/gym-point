import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';

import { MdCheckCircle } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, EnrollmentTable } from './styles';

import ButtonRegister from '~/components/ButtonRegister';

export default function Enrollments() {
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

  async function handleDelete({ id, student }) {
    const confirm = window.confirm(
      `Deseja mesmo apagar a matrícula de ${student.name}?\nIsso será permanente.`
    );

    if (!confirm) {
      toast.error('Matrícula não foi apagada!');
      return;
    }

    await api.delete(`enrolls/${id}`);
    handleEnrollments();
    toast.success('Matrícula apagada com sucesso!');
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
              <th>ATIVA</th>
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
                    <Link to="/">Editar</Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(enrollment)}
                    >
                      Apagar
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
