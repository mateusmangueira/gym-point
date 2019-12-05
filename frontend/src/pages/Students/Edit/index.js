import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import Input from '~/components/Input';
import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import Form from '~/components/DefaultForm';

import { Container } from './styles';

import { updateStudentRequest } from '~/store/modules/student/actions';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Insira um e-mail válido'),
  age: Yup.number().typeError('Insira uma idade válida'),
  weight: Yup.number().typeError('Insira um peso válido'),
  height: Yup.number().typeError('Insira uma altura válida'),
});

export default function Edit({ match }) {
  const dispatch = useDispatch();
  const { id } = match.params;

  async function handleEdit({ name, email, age, weight, height }) {
    dispatch(updateStudentRequest(name, email, age, weight, height, id));
  }

  return (
    <Container>
      <header>
        <h1>Edição de aluno</h1>

        <div>
          <ButtonBack type="button" />
          <ButtonSave type="submit" form="student-form-edit" />
        </div>
      </header>

      <Form schema={schema} onSubmit={handleEdit} id="student-form-edit">
        <span>NOME COMPLETO</span>
        <Input name="name" type="text" placeholder="Novo nome completo" />
        <span>ENDEREÇO DE E-MAIL</span>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <div>
          <div>
            <span>IDADE</span>
            <Input name="age" type="text" placeholder="Sua nova idade" />
          </div>
          <div>
            <span>PESO (em kg)</span>
            <Input name="weight" type="text" placeholder="Seu novo peso" />
          </div>
          <div>
            <span>ALTURA</span>
            <Input name="height" type="text" placeholder="Sua nova altura" />
          </div>
        </div>
      </Form>
    </Container>
  );
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
