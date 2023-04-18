import { useRouter } from 'next/router'
import useGetQuiz from "@/hooks/useGetQuiz";
import React, { useState, useEffect  } from 'react';
import Quiz from "@/components/Quiz";

export default function PlayQuizHome() {
    const router = useRouter()
    const quizIdTemp = router.query.quizId as string;
    const { data: quiz } = useGetQuiz(quizIdTemp);

    return(
        <div className="text-white">
            <Quiz data={quiz}></Quiz>
        </div>
    )
}
