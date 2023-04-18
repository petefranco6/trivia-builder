import { useRouter } from "next/router";
import useGetQuiz from "@/hooks/useGetQuiz";
import React, { useState, useEffect } from "react";
import EditQuiz from "@/components/EditQuiz";
import { quiz, question, answer } from "@/models/quiz";

export default function EditQuizHome() {
  const router = useRouter();
  const quizIdTemp = router.query.quizId as string;
  const [quizData, setQuizData] = useState<quiz | null>(null);
  const { data: quiz } = useGetQuiz(quizIdTemp);

  useEffect(() => {
    setQuizData(quiz);
  }, [quiz]);

  const questionAdded = (question: question) => {
    if (quizData) {
      setQuizData({
        ...quizData,
        questions: [...quizData.questions, question],
      });
    }
  };

  const answerAdded = (questionIndex: number, answer: answer) => {
    if (quizData) {
      const updatedAnswers = [
        ...quizData.questions[questionIndex].answers,
        answer,
      ];
      setQuizData({
        ...quizData,
        questions: quizData.questions.map((q, i) => {
          if (i == questionIndex) {
            q.answers = updatedAnswers;
          }
          return q;
        }),
      });
    }
  };

  const promptChanged = (questionIndex: number, prompt: string) => {
    if (quizData) {
      const updatedQuestions = quizData.questions.map((question, i) => {
        if (i == questionIndex) {
          question.prompt = prompt;
        }
        return question;
      });

      setQuizData({
        ...quizData,
        questions: updatedQuestions,
      });
    }
  };

  const imageChanged = (questionIndex: number, image: string) => {
    if (quizData) {
      const updatedQuestions = quizData.questions.map((question, i) => {
        if (i == questionIndex) {
          question.image = image;
        }
        return question;
      });

      setQuizData({
        ...quizData,
        questions: updatedQuestions,
      });
    }
  };

  const answerTextChanged = (
    questionIndex: number,
    answerIndex: number,
    text: string
  ) => {
    if (quizData) {
      const updatedQuestions = quizData.questions.map((question, i) => {
        if (i == questionIndex) {
          for (let j = 0; j < question.answers.length; j++) {
            if (j == answerIndex) question.answers[j].text = text;
          }
        }
        return question;
      });

      setQuizData({
        ...quizData,
        questions: updatedQuestions,
      });
    }
  };

  const answerIsCorrectChanged = (
    questionIndex: number,
    answerIndex: number
  ) => {
    if (quizData) {
      const updatedQuestions = quizData.questions.map((question, i) => {
        if (i == questionIndex) {
          for (let j = 0; j < question.answers.length; j++) {
            if (j == answerIndex)
              question.answers[j].isCorrect = !question.answers[j].isCorrect;
          }
        }
        return question;
      });
      setQuizData({
        ...quizData,
        questions: updatedQuestions,
      });
    }
  };

  return (
    <div>
      <EditQuiz
        data={quizData}
        questionAdded={questionAdded}
        answerAdded={answerAdded}
        promptChanged={promptChanged}
        imageChanged={imageChanged}
        answerTextChanged={answerTextChanged}
        answerIsCorrectChanged={answerIsCorrectChanged}
      ></EditQuiz>
    </div>
  );
}
