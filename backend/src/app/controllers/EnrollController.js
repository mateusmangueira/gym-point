import { addMonths, parseISO } from 'date-fns';
import Enroll from '../models/Enroll';
import Student from '../models/Student';
import Plan from '../models/Plan';
import * as Yup from 'yup';

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
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, plan_id, start_date } = req.body;
    const enrollExists = await Enroll.findOne({
      where: { student_id },
    });

    if (enrollExists) {
      return res.status(401).json({ error: 'Enroll studant failed: This student is already enrolled to a gym.' });
    }

    const plan = await Plan.findByPk(plan_id);
    const price = plan.duration * plan.price;
    const end_date = addMonths(parseISO(start_date), plan.duration);

    const enroll = await Enroll.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json(enroll);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Update studant validation failed' });
    }

    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const enrollment = await Enroll.findByPk(id);
    const plan = await Plan.findByPk(plan_id);

    // Check if admin can edit student_id
    if (student_id !== enrollment.student_id) {
      const studentEnrollmentExists = await Enroll.findOne({
        where: { student_id },
      });

      if (studentEnrollmentExists) {
        return res.status(401).json({ error: 'Update student failed: This student is already enrolled to a gym.' });
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

    await Enroll.destroy({ where: { id } });

    return res.send();
  }

}

export default new EnrollController()