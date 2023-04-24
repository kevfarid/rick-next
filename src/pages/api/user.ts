import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type Data = {
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data: {},
    });
    res.status(200).json({ id: user.id });
  }
}
