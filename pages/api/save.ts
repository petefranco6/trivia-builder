import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  try {
    const { data } = req.body;

    const quiz = await prismadb.quiz.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        questions: data.questions,
        games: data.games
      },
    });

    return res.status(200).json(quiz);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
