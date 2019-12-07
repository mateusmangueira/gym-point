import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import history from '../../services/history';
import { formatPrice } from '../../util/format';

import ButtonRegister from '~/components/ButtonRegister';
import { Container, Content, PlanTable } from './styles';

import {
  deletePlanRequest,
  loadAllPlansRequest,
} from '../../store/modules/plan/actions';

export default function Plans() {
  const dispatch = useDispatch();
  const plans = useSelector(state => state.plan.allPlans);

  useEffect(() => {
    dispatch(loadAllPlansRequest());
  }, []); // eslint-disable-line

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
