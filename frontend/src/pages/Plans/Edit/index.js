import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import Form from '~/components/DefaultForm';
import Input from '~/components/Input';

import { updatePlanRequest } from '../../../store/modules/plan/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string(),
  duration: Yup.number().min(1, 'Duração minima de 1 mês'),
  price: Yup.number().typeError('Insira um preço válido'),
});

export default function Edit({ match }) {
  const dispatch = useDispatch();
  const { id } = match.params;

  const [planDuration, setPlanDuration] = useState(0);
  const [planPrice, setPlanPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const plan = useSelector(state => {
    return state.plan.allPlans.find(item => {
      return Number(item.id) === id;
    });
  }) || { title: 'Digite um plano', duration: 1, price: 0 };

  const priceCurrency = useMemo(() => `R$ ${total.toFixed(2)}`, [total]);

  useEffect(() => {
    if (planDuration || planPrice) {
      setTotal((planDuration || plan.duration) * (planPrice || plan.price));
    } else {
      setTotal(plan.duration * plan.price);
    }
  }, [planDuration, planPrice]); // eslint-disable-line

  function handleEdit({ title, duration, price }) {
    dispatch(updatePlanRequest(title, duration, price, id));
  }

  return (
    <Container>
      <header>
        <h1>Edição de Plano</h1>

        <div>
          <ButtonBack type="button" />
          <ButtonSave type="submit" form="plan-form" />
        </div>
      </header>

      <Form schema={schema} onSubmit={handleEdit} id="plan-form">
        <span>TÍTULO DO PLANO</span>
        <Input name="title" type="text" />
        <div>
          <div>
            <span>DURAÇÃO (em meses)</span>
            <Input
              name="duration"
              type="number"
              min="1"
              step="1"
              onChange={e => setPlanDuration(e.target.value)}
            />
          </div>
          <div>
            <span>PREÇO MENSAL</span>
            <Input
              name="price"
              type="number"
              placeholder="R$ 0.00"
              onChange={e => setPlanPrice(e.target.value)}
            />
          </div>
          <div>
            <span>PREÇO TOTAL</span>
            <Input name="totalPrice" value={priceCurrency} disabled />
          </div>
        </div>
      </Form>
    </Container>
  );
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

Edit.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};
