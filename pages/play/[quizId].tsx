import { useRouter } from 'next/router'
import useGetQuiz from "@/hooks/useGetQuiz";
import React, { useState, useEffect  } from 'react';
import Quiz from "@/components/Quiz";

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
