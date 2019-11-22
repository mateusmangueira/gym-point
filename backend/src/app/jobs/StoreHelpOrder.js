import Mail from '../../lib/Mail';

class StoreHelpOrder {
	get key() {
		return 'StoreHelpOrder';
	}

	async handle({ data }) {
		const { student, question, answer } = data;

		await Mail.sendMail({
			to: `${student.name} <${student.email}>`,
			subject: 'Email Automático de resposta - GymPoint',
			template: 'storeHelpOrder',
			context: {
				student: student.name,
				question,
				answer,
			},
		});
	}
}

export default new StoreHelpOrder();