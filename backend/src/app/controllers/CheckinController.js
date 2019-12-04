import { subDays, isAfter } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enroll from '../models/Enroll';

class CheckinController {
  async index(req, res) {
    const { page = 1, quantity = 20, id } = req.params;

    const checkIns = await Checkin.findAll({
      where: { student_id: id },
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

    return res.json(checkIns);
  }

  async store(req, res) {
    const { id } = req.params;

    const isStudentAble = await Enroll.findOne({
      where: { student_id: id },
    });

    if (!isStudentAble || !isAfter(isStudentAble.end_date, new Date())) {
      return res
        .status(401)
        .json({ error: 'You are not able to enroll this gym' });
    }

    const checkIns = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });

    if (checkIns.length >= 5) {
      return res
        .status(401)
        .json({ error: 'You can only check-in five times per week' });
    }
    const { student_id, created_at } = await Checkin.create({ student_id: id });

    return res.json({ id, student_id, created_at });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Checkin.destroy({ where: { id } });

    return res.send();
  }
}

export default new CheckinController();
