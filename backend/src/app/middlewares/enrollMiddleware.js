import * as Yup from 'yup';

import Enroll from '../models/Enroll';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
  });

  if (!(await schema.isValid(req.params))) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  const { id } = req.params;
  const enroll = await Enroll.findByPk(id);

  if (!enroll) {
    return res.status(400).json({ error: 'Enrollment does not exist' });
  }

  return next();
};