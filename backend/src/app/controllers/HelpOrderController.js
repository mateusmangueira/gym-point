import * as Yup from 'yup';
import { format } from 'date-fns-tz';
import pt from 'date-fns/locale/pt-BR';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

import Mail from '../../lib/Mail';

class HelpOrderController {
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.params;

    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      limit: quantity,
      offset: (page - 1) * quantity,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async show(res, req) {
    const { id } = req.params;

    const helpOrder = await HelpOrder.findByPk(id);

    return res.json(helpOrder);
  }

  async storeQuestion(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Store question validation failed.' });
    }

    const { question } = req.body;
    const { id } = req.params;

    const checkStudent = await Student.findByPk(id);
    if (!checkStudent) {
      return res
        .status(400)
        .json({ error: 'Student was not found to check-in.' });
    }

    const helporder = await HelpOrder.create({
      question,
      student_id: id,
    });

    return res.json(helporder);
  }

  async storeAnswer(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Store answer validation failed.' });
    }

    const { answer } = req.body;
    const { id } = req.params;

    const helpOrder = await HelpOrder.findByPk(id);
    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order was not found.' });
    }

    const response = await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    await helpOrder.save();

    const student = await Student.findByPk(helpOrder.student_id);

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Resposta a seu pedido de auxílio.',
      template: 'helporderanswer',
      context: {
        provider: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answer_at: format(
          helpOrder.answer_at,
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          { locale: pt }
        ),
      },
    });

    return res.json(response.data);
  }

  async questionsStudent(req, res) {
    const helps = await HelpOrder.findAll({
      where: { student_id: req.params.id },
    });
    return res.json(helps);
  }
}

export default new HelpOrderController();
