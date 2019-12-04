import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

import ButtonRegister from '~/components/ButtonRegister';
import { Container, Content, PlanTable } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  async function handlePlans() {
    const response = await api.get('plans');

    const data = response.data.map(plan => {
      plan.priceFormated = formatPrice(plan.price);
      if (plan.duration === 1) {
        plan.durationFormated = '1 mês';
      } else {
        plan.durationFormated = `${plan.duration} meses`;
      }
      return plan;
    });

    setPlans(data);
  }

  useEffect(() => {
    handlePlans();
  }, []);

  async function handleDelete({ id, title }) {
    const confirm = window.confirm(`Deseja mesmo apagar o plano, ${title}?`);

    if (!confirm) {
      toast.error('Plano não apagado');
      return;
    }

    try {
      await api.delete(`plans/${id}`);
      handlePlans();

      toast.success('Plano apagado com sucesso!');
    } catch (err) {
      toast.error('Existe uma matrícula ativa com esse plano!');
    }
  }

  return (
    <Container>
      <Content>
        <header>
          <h1>Gerenciando planos</h1>
          <ButtonRegister
            type="button"
            onClick={() => {
              history.push('/plans/register');
            }}
          />
        </header>

        <PlanTable>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR p/ MÊS</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td align="center">{plan.durationFormated}</td>
                <td align="center">{plan.priceFormated}</td>
                <td>
                  <div>
                    <Link
                      to={{
                        pathname: `/plans/edit/${plan.id}`,
                      }}
                    >
                      Editar
                    </Link>
                    <button type="button" onClick={() => handleDelete(plan)}>
                      Apagar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </PlanTable>
      </Content>
    </Container>
  );
}
