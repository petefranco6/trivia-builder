import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const quizzes = await prismadb.quiz.findMany();

    return res.status(200).json(quizzes);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
