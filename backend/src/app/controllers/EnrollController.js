import { addMonths, parseISO, endOfDay } from 'date-fns';
import * as Yup from 'yup';

import Enroll from '../models/Enroll';
import Student from '../models/Student';
import Plan from '../models/Plan';

import Queue from '../../lib/Queue';
import StoreEnrollMail from '../jobs/StoreEnrollMail';

class EnrollController {
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.params;

    const enrolls = await Enroll.findAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });
    return res.json(enrolls);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Enroll store validation failed' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const enrollExists = await Enroll.findOne({
      where: { student_id },
    });

    if (enrollExists) {
      return res.status(401).json({
        error:
          'Enroll student failed: This student is already enrolled to a gym.',
      });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const plan = await Plan.findByPk(plan_id, {
      attributes: ['id', 'title', 'duration', 'price'],
    });

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    const price = plan.duration * plan.price;
    const end_date = endOfDay(addMonths(parseISO(start_date), plan.duration));

    const enroll = await Enroll.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    await Queue.add(StoreEnrollMail.key, {
      student,
      plan,
      price,
      end_date,
    });

    return res.json(enroll);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Update enrollment validation failed' });
    }

    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const enrollment = await Enroll.findByPk(id);
    const plan = await Plan.findByPk(plan_id);

    if (student_id === enrollment.student_id) {
      const studentEnrollmentExists = await Enroll.findOne({
        where: { student_id },
      });

      if (studentEnrollmentExists) {
        return res.status(401).json({
          error:
            'Enrollment update failed: This student is already enrolled to a gym.',
        });
      }
    }

    let { price, end_date } = enrollment;

    if (plan_id !== enrollment.plan_id) {
      price = plan.duration * plan.price;
      end_date = addMonths(parseISO(start_date), plan.duration);
    }

    if (start_date !== enrollment.start_date) {
      end_date = addMonths(parseISO(start_date), plan.duration);
    }

    await enrollment.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
    await enrollment.save();
    return res.json(enrollment);
  }

  async delete(req, res) {
    const { id } = req.params;

    const enroll = await Enroll.findByPk(id);

    if (!enroll) {
      return res.status(400).json({ error: 'Enrollment does not exist' });
    }

    enroll.destroy();

    return res.send({ ok: 'Enrollment has been succefully deleted' });
  }
}

export default new EnrollController();
