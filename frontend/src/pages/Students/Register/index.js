import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import Input from '~/components/Input';
import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import Form from '~/components/DefaultForm';

import { Container } from './styles';

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
  async function handleRegister({ name, email, age, height, weight }) {
    try {
      await api.post('/students', {
        name,
        email,
        age,
        height,
        weight,
      });

      toast.success('Aluno criado com sucesso!');
      history.goBack();
    } catch (err) {
      toast.error('Já existe um aluno cadastrado com esse e-mail');
    }
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
        <Input name="name" type="text" placeholder="Nome completo do aluno" />
        <span>ENDEREÇO DE E-MAIL</span>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <div>
          <div>
            <span>DATA DE NASCIMENTO</span>
            <Input name="age" type="text" />
          </div>
          <div>
            <span>PESO (em kg)</span>
            <Input name="weight" type="text" />
          </div>
          <div>
            <span>ALTURA</span>
            <Input name="height" type="text" />
          </div>
        </div>
      </Form>
    </Container>
  );
}
