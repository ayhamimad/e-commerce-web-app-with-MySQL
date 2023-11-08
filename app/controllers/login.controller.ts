import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/';
const User = db.user;

interface Us{
    id: Number,
    email: String
}

export const loginUser = (req: Request, res: Response) => {
  const user = req.body.user as Us;
  const token = jwt.sign({ id: user.id }, 'top-secret', { expiresIn: '1h' });
  res.json({ token });
};
