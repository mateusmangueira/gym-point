import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
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

export default function Edit({ match }) {
	const [student, setStudent] = useState({});
	const { name: studentName } = match.params;

	useEffect(() => {
		async function handleStudent() {
			const response = await api.get('students', {
				params: { q: studentName },
			});

			const { id, name, email, idade, altura } = response.data.response[0];

			setStudent({
				id,
				name,
				email,
				idade,
				altura,
			});
		}

		handleStudent();
	}, [studentName]);

	async function hanldeSubmit({ name, email, idade, altura }) {
		await api.put(`students/${student.id}`, {
			name,
			email,
			idade,
			altura,
		});

		history.goBack();
		toast.success('Aluno editado com sucesso!');
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

			<Form
				schema={schema}
				initialData={student}
				onSubmit={hanldeSubmit}
				id="student-form-edit"
			>
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

Edit.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			name: PropTypes.string.isRequired,
		}),
	}),
};

Edit.defaultProps = {
	match: {
		params: {
			name: '',
		},
	},
};
