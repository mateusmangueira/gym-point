import * as Yup from 'yup';
import { isBefore, subDays } from 'date-fns';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

class StudentController {
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.params;

    const students = await Student.findAll({
      limit: quantity,
      offset: (page - 1) * quantity,
    });

    return res.json(students);
  }

  async signIn(req, res) {
    const { name } = req.body;

    if (name) {
      const studentExists = await Student.findOne({ where: { name } });

      if (studentExists) {
        return res.json(studentExists);
      }
    }

    return res.status(400).json({ error: 'Student was not found.' });
  }

  async checkins(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    const allCheckins = await Checkin.findAll({
      where: { student_id: student.id },
    });

    const todayMinusSeven = subDays(new Date(), 7);
    let numberCheckins = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const key in allCheckins) {
      if (isBefore(todayMinusSeven, allCheckins[key].createdAt)) {
        numberCheckins++;
      }
    }

    return res.json({ allCheckins, numberCheckins });
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Student validation failed' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({ id, name, email, age, weight, height });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().positive(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Student update validation failed' });
    }

    const { id } = req.params;
    const { name, email, age, weight, height } = req.body;

    const student = await Student.findByPk(id);

    if (student.email !== email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(401).json({ error: 'Email is already in use' });
      }
    }

    await student.update({ name, email, age, weight, height });
    await student.save();

    return res.json(student);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Student.destroy({ where: { id } });

    return res.send({ ok: 'Student has been succefully deleted ' });
  }
}

export default new StudentController();
