import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { prisma } from '../lib/prisma';

const authRoutes = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// Register
authRoutes.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashed }
    });
    res.json({ message: 'User registered' });
  } catch (e) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login
authRoutes.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  // ...validate input...
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// Get API Key (protected)
authRoutes.get('/apikey', async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const { userId } = jwt.verify(auth.split(' ')[1], JWT_SECRET) as { userId: string };
    let apiKey = await prisma.apiKey.findUnique({ where: { userId } });
    if (!apiKey) {
      const key = nanoid(32);
      apiKey = await prisma.apiKey.create({
        data: { key, userId }
      });
    }
    res.json({ apiKey: apiKey.key });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default authRoutes;
