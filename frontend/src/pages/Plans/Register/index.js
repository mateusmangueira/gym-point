import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { Container, Content } from './styles';

import api from '~/services/api';
import history from '~/services/history';

import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import Form from '~/components/DefaultForm';
import Input from '~/components/Input';

import { formatPrice } from '~/util/format';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .min(1, 'Duração minima de 1 mês')
    .required('A duração é obrigatória')
    .typeError('Insira uma duração válida'),
  price: Yup.number()
    .required('O preço é obrigatório')
    .typeError('Insira um preço válido'),
});

export default function Register() {
  const [priceForm, setPriceForm] = useState('0');
  const [durationForm, setDurationForm] = useState('0');
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    setTotalPrice(formatPrice(priceForm * durationForm || 0));
  }, [durationForm, priceForm]);

  async function hanldeSubmit({ title, duration, price }) {
    try {
      await api.post('plans', {
        title,
        duration,
        price,
      });

      history.goBack();
      toast.success('Plano criado com sucesso!');
    } catch (err) {
      toast.error('Existe um outro plano com este título');
    }
  }

  return (
    <Container>
      <Content>
        <header>
          <h1>Cadastro de Plano</h1>

          <div>
            <ButtonBack type="button" />
            <ButtonSave type="submit" form="plan-form" />
          </div>
        </header>

        <Form
          schema={schema}
          initialData={{ totalPrice }}
          onSubmit={hanldeSubmit}
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
                onChange={e => setDurationForm(e.target.value)}
              />
            </div>
            <div>
              <span>PREÇO MENSAL</span>
              <Input
                name="price"
                type="price"
                onChange={e => setPriceForm(e.target.value)}
              />
            </div>
            <div>
              <span>PREÇO TOTAL</span>
              <Input name="totalPrice" type="price" disabled />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
