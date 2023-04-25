import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type Data = {
  id: string | null;
  favorites?: number[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: req.body.id || req.query.id,
    },
  });

  if (req.method === 'PUT') {
    try {
      const userUpdated = await prisma.user.update({
        where: {
          id: req.body.id,
        },
        data: {
          favorites: req.body.favorites,
        },
      });

      res.status(200).json({
        id: userUpdated.id,
        favorites: userUpdated.favorites,
      });
    } catch (e: unknown) {
      const error = e as Error;
      res.status(500).json({ id: null, error: error.message });
    }
  }

  if (req.method === 'GET') {
    res.status(200).json({
      id: user?.id || null,
      favorites: user?.favorites,
    });
  }
}
