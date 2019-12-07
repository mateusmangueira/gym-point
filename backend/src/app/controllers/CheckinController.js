import { subDays, isBefore } from 'date-fns';
import * as Yup from 'yup';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

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
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .required()
        .integer()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Checkin store validation failed.' });
    }

    const checkStudent = await Student.findByPk(req.body.student_id);
    if (!checkStudent) {
      return res
        .status(400)
        .json({ error: 'Student was not found to check-in.' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id: req.body.student_id },
    });

    const todayMinusSeven = subDays(new Date(), 7);
    let numberOfCheckin = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const key in checkins) {
      if (isBefore(todayMinusSeven, checkins[key].createdAt)) {
        numberOfCheckin++;
      }
    }

    if (numberOfCheckin >= 5) {
      return res
        .status(400)
        .json({ error: 'Student already have 5 checkins in the last 7 days.' });
    }

    const newCheckin = await Checkin.create(req.body);

    return res.json({
      newCheckin,
      checkin_count: numberOfCheckin,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Checkin.destroy({ where: { id } });

    return res.send();
  }
}

export default new CheckinController();
