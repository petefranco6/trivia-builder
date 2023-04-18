import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { quizId } = req.query;

    if (typeof quizId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!quizId) {
      throw new Error('Missing Id');
    }

    const deleteQuiz = await prismadb.quiz.delete({
      where: {
        id: quizId,
      },
    });

    return res.status(200).json(deleteQuiz);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
