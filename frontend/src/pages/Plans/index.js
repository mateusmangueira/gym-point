import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import history from '~/services/history';
import { formatPrice } from '../../util/format';

import ButtonRegister from '~/components/ButtonRegister';
import { Container, Content, PlanTable } from './styles';

import { deletePlanRequest } from '~/store/modules/plan/actions';

export default function Plans() {
  const dispatch = useDispatch();
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

  function handleDelete(id) {
    const result = window.confirm('Tem certeza que deseja deletar esse plano?');
    if (result) {
      dispatch(deletePlanRequest(id));
    }
  }

  function handleFormatPrice(price) {
    const result = formatPrice(price);
    return result;
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
                <td align="center">
                  {plan.duration}
                  {plan.duration > 1 ? ' meses' : ' mês'}
                </td>
                <td align="center">{handleFormatPrice(plan.price)}</td>
                <td>
                  <div>
                    <Link
                      to={{
                        pathname: `/plans/edit/${plan.id}`,
                      }}
                    >
                      editar
                    </Link>
                    <button type="button" onClick={() => handleDelete(plan.id)}>
                      apagar
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
