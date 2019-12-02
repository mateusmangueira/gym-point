import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class StoreEnrollMail {
  get key() {
    return 'StoreEnrollMail';
  }

  async handle({ data }) {
    const { student, plan, price, end_date } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula no GymPoint realizada com sucesso',
      template: 'storeEnroll',
      context: {
        student: student.name,
        plan: plan.title,
        end_date: format(parseISO(end_date), "'dia' dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        price,
      },
    });
  }
}

export default new StoreEnrollMail();
