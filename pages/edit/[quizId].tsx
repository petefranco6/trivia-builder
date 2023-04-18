import { useRouter } from "next/router";
import useGetQuiz from "@/hooks/useGetQuiz";
import React, { useState, useEffect } from "react";
import EditQuiz, { answer, question } from "@/components/EditQuiz";
import { quiz } from "@/components/EditQuiz";

export default function EditQuizHome() {
  const router = useRouter();
  const quizIdTemp = router.query.quizId as string;
  const [quizData, setQuizData] = useState<quiz|null>(null);
  const { data: quiz } = useGetQuiz(quizIdTemp);

  useEffect(() => {
    setQuizData(quiz);
  }, [quiz])

  const questionAdded = (question: question) => {
    if(quizData) {
        setQuizData({
            ...quizData,
            questions: [...quizData.questions, question]
        });
    }
  };

  const answerAdded = (questionIndex: number, answer: answer) => {
    if(quizData) {

        const updatedAnswers = [...quizData.questions[questionIndex].answers, answer]
        setQuizData({
            ...quizData,
            questions: quizData.questions.map((q,i)=>{
                if(i == questionIndex){
                    q.answers = updatedAnswers
                }
                return q;
            })
        });
    }
  };

  return (
    <div className="text-white">
      <EditQuiz data={quizData} questionAdded={questionAdded} answerAdded={answerAdded}></EditQuiz>
    </div>
  );
}
