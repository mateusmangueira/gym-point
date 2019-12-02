import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import Input from '~/components/Input';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />
      <h1>GYMPOINT</h1>
      <Form schema={schema} onSubmit={handleSubmit}>
        <span>SEU E-MAIL</span>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <span>SUA SENHA</span>
        <Input name="password" type="password" placeholder="*************" />

        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
