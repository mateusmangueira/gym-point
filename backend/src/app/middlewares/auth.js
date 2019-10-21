import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const { admin } = req.body;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token was not provided' });
  }

  if (!admin) {
    return res.status(401).json({ error: 'User is not an Admin' })
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token is invalid' });
  }
};
