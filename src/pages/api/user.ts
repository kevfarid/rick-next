import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type Data = {
  id?: string;
  error?: Error;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const prisma = new PrismaClient();
      const user = await prisma.user.create({
        data: {
          favorites: req.body.favorites,
        },
      });
      res.status(200).json({ id: user.id });
    } catch (error: unknown) {
      res.status(500).json({ error: error as Error });
    }
  }
}
