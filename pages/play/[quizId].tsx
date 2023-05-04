import { useRouter } from 'next/router'
import useGetQuiz from "@/hooks/useGetQuiz";
import React from 'react';
import Quiz from "@/components/Quiz";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanant: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function PlayQuizHome() {
    const router = useRouter()
    const quizIdTemp = router.query.quizId as string;
    const { data: quiz } = useGetQuiz(quizIdTemp);

    return(
        <div className="flex w-full h-screen justify-center items-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <Quiz data={quiz}></Quiz>
        </div>
    )
}
