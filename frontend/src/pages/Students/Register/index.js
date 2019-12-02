import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

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
  idade: Yup.number()
    .required('A idade é obrigatória')
    .typeError('Insira uma idade válida'),
  altura: Yup.number()
    .required('A altura é obrigatória')
    .typeError('Insira uma idade válida'),
});

export default function Register() {
  async function hanldeSubmit(data, { resetForm }) {
    const { name, email, idade, altura } = data;
    try {
      await api.post('students', {
        name,
        email,
        idade,
        altura,
      });

      history.push('/students');
      toast.success('Aluno cadastrado com sucesso!');
    } catch (error) {
      resetForm();
      toast.error('Aluno já cadastrado');
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

      <Form schema={schema} onSubmit={hanldeSubmit} id="student-form">
        <span>NOME COMPLETO</span>
        <Input name="name" type="text" placeholder="Nome completo do aluno" />
        <span>ENDEREÇO DE E-MAIL</span>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <div>
          <div>
            <span>IDADE</span>
            <Input name="idade" type="text" />
          </div>
          <div>
            <span>PESO (em kg)</span>
            <Input name="peso" type="text" />
          </div>
          <div>
            <span>Altura</span>
            <Input name="altura" type="text" />
          </div>
        </div>
      </Form>
    </Container>
  );
}
