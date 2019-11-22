import { isAfter } from 'date-fns';
import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Enroll from '../models/Enroll';

class StudantHelpController {

  async index(req, res) {
    const { page = 1, quantity = 20 } = req.params;

    const { id } = req.params;

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: id },
      limit: quantity,
      offset: (page - 1) * quantity,
    });
    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Student help order Validation failed' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist, help order validation failed' });
    }

    const enroll = await Enroll.findOne({
      where: { student_id: id },
    });

    if (!enroll) {
      return res
        .status(400)
        .json({ error: 'Student is not enrolled.' });
    }

    const { question } = req.body;

    const isStudentAble = await Enroll.findOne({
      where: { student_id: id },
    });

    if (!isStudentAble || !isAfter(isStudentAble.end_date, new Date())) {
      return res
        .status(401)
        .json({ error: 'Your enrollment is not able to send help orders' });
    }

    const helpOrder = await HelpOrder.create({ student_id: id, question });

    return res.json(helpOrder);
  }
}

export default new StudantHelpController();