import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { updatePlanRequest } from '~/store/modules/plan/actions';

import {
  Container,
  Content,
  Nav,
  Box,
  InputsBelow,
} from './styles';

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
      return item.id.toString() === id;
    });
  }) || { title: 'Digite um plano', duration: 0, price: 0 };

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
      <Content>
        <Form initialData={plan} schema={schema} onSubmit={handleEdit}>
          <Nav>
            <strong>Edição de Plano</strong>
            <div>
              <Link to="/plans/">
                <MdChevronLeft size={24} color="#fff" />
                Voltar
              </Link>
              <button type="submit">
                <MdCheck size={24} color="#fff" />
                Salvar
              </button>
            </div>
          </Nav>
          <Box>
            <p>Título do Plano</p>
            <Input name="title" />
            <InputsBelow>
              <div>
                <p>Duração</p>
                <Input
                  checked={planDuration}
                  onChange={e => setPlanDuration(e.target.value)}
                  name="duration"
                  type="number"
                  min="1"
                  step="1"
                  autoComplete="off"
                />
              </div>
              <div>
                <p>Preço Mensal</p>
                <Input
                  checked={planPrice}
                  onChange={e => setPlanPrice(e.target.value)}
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="R$ 0.00"
                  autoComplete="off"
                />
              </div>
              <div>
                <p>Preço Total</p>
                <input name="total" value={priceCurrency} disabled />
              </div>
            </InputsBelow>
          </Box>
        </Form>
      </Content>
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
