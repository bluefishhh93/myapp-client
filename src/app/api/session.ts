// src/pages/api/session.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  
  if (session) {
    res.status(200).json(session);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
