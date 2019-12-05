import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import Input from '~/components/Input';
import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import Form from '~/components/DefaultForm';

import { Container } from './styles';

import { createStudentRequest } from '~/store/modules/student/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-email é obrigatório'),
  age: Yup.number()
    .required('A idade é obrigatória')
    .typeError('Insira uma idade válida'),
  weight: Yup.number()
    .required('O peso é obrigatório')
    .typeError('Insira um peso válido'),
  height: Yup.number()
    .required('A altura é obrigatória')
    .typeError('Insira uma altura válida'),
});

export default function Register() {
  const dispatch = useDispatch();

  function handleRegister({ name, email, age, weight, height }) {
    dispatch(createStudentRequest(name, email, age, weight, height));
  }

  return (
    <Container>
      <header>
        <h1>Cadastro de aluno</h1>

        <div>
          <ButtonBack type="button" />
          <ButtonSave type="submit" form="student-form" />
        </div>
      </header>

      <Form schema={schema} onSubmit={handleRegister} id="student-form">
        <span>NOME COMPLETO</span>
        <Input name="name" type="text" placeholder="Nome completo" />
        <span>ENDEREÇO DE E-MAIL</span>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <div>
          <div>
            <span>IDADE</span>
            <Input name="age" type="text" placeholder="Sua idade" />
          </div>
          <div>
            <span>PESO (em kg)</span>
            <Input name="weight" type="text" placeholder="Seu peso" />
          </div>
          <div>
            <span>ALTURA</span>
            <Input name="height" type="text" placeholder="Sua altura" />
          </div>
        </div>
      </Form>
    </Container>
  );
}
