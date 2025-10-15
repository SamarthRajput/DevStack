import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

export default async function (req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'] as string | undefined;
  if (!apiKey) return res.status(401).json({ error: 'API key required' });
  const key = await prisma.apiKey.findUnique({ where: { key: apiKey } });
  if (!key) return res.status(403).json({ error: 'Invalid API key' });
  req.userId = key.userId;
  next();
}
