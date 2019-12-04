import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import { formatPrice } from '~/util/format';
import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import Form from '~/components/DefaultForm';
import Input from '~/components/Input';

import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .min(1, 'Duração minima de 1 mês')
    .required('A duração é obrigatória'),
  price: Yup.number()
    .required('O preço é obrigatório')
    .typeError('Insira um preço válido'),
});

export default function Edit({ match }) {
  const { id } = match.params;
  const [plan, setPlan] = useState({});

  useEffect(() => {
    async function handlePlan() {
      const response = await api.get('plans');

      const planEdit = response.data.find(p => p.id === Number(id));
      planEdit.totalPrice = formatPrice(planEdit.duration * planEdit.price);
      /* planEdit.priceFormated = formatPrice(planEdit.price); */
      setPlan(planEdit);
    }

    handlePlan();
  }, [id]);

  function handlePlanDuration(e) {
    const duration = e.target.value;

    const data = { ...plan };
    const totalPrice = duration * data.price;

    data.totalPrice = formatPrice(totalPrice || 0);

    setPlan(data);
  }

  function handlePlanPrice(e) {
    const price = e.target.value;

    const data = { ...plan };
    const totalPrice = data.duration * price;

    data.totalPrice = formatPrice(totalPrice || 0);
    setPlan(data);
  }

  async function handleSubmit({ title, duration, price }) {
    await api.put(`plans/${id}`, {
      title,
      duration,
      price,
    });

    history.goBack();
    toast.success('Plano editado com sucesso!');
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

      <Form
        schema={schema}
        initialData={plan}
        onSubmit={handleSubmit}
        id="plan-form"
      >
        <span>TÍTULO DO PLANO</span>
        <Input name="title" type="text" />
        <div>
          <div>
            <span>DURAÇÃO (em meses)</span>
            <Input
              name="duration"
              type="text"
              onChange={e => handlePlanDuration(e)}
            />
          </div>
          <div>
            <span>PREÇO MENSAL</span>
            <Input
              name="price"
              type="price"
              onChange={e => handlePlanPrice(e)}
            />
          </div>
          <div>
            <span>PREÇO TOTAL</span>
            <Input name="totalPrice" disabled />
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
