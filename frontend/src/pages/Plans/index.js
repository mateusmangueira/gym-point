import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '~/services/history';

import ButtonRegister from '~/components/ButtonRegister';
import { Container, Content, PlanTable } from './styles';

import {
  handlePlansRequest,
  deletePlanRequest,
} from '~/store/modules/plan/actions';

export default function Plans() {
  const dispatch = useDispatch();
  const plans = useSelector(state => state.plan.plans) || [];

  useEffect(() => {
    dispatch(handlePlansRequest(1));
  }, []); // eslint-disable-line

  function handleDelete(id) {
    const result = window.confirm('Tem certeza que deseja deletar esse plano?');
    if (result) {
      dispatch(deletePlanRequest(id));
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
                <td align="center">
                  {plan.durationFormated}{' '}
                  {plan.durationFormated > 1 ? ' meses' : ' mês'}
                </td>
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
                    <button type="button" onClick={() => handleDelete(plan.id)}>
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
