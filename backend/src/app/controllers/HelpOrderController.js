import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import AnswerMail from '../jobs/StoreHelpOrder';
import Queue from '../../lib/Queue';

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

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (helpOrder.answer_at) {
      return res
        .status(401)
        .json({ error: 'You can answer a help order only once' });
    }

    await helpOrder.update({ answer, answer_at: new Date() });
    await helpOrder.save();

    await Queue.add(AnswerMail.key, {
      helpOrder,
    });

    return res.json(helpOrder);
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new HelpOrderController()
