import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, category, questions, description, authorId } = req.body;


    const newQuiz = await prismadb.quiz.create({
        data: {
            name,
            category,
            questions,
            description,
            authorId
        }
    })

    return res.status(200).json(newQuiz);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
