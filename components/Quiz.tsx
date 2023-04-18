import { isEmpty } from "lodash";
import { useState } from "react";
import Link from "next/link";
import { quiz, question, answer } from "@/models/quiz";

export interface userAnswer {
  questionIndex: number;
  answer: answer;
}

interface Quiz {
  data: quiz;
}

const Quiz: React.FC<Quiz> = ({ data }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<answer>({
    text: "",
    isCorrect: false,
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<userAnswer[]>([]);

  const submitAnswer = (event: any) => {
    event.preventDefault();

    setUserAnswers([
      ...userAnswers,
      { questionIndex: questionIndex, answer: selectedAnswer },
    ]);
    setQuestionIndex(questionIndex + 1);
  };

  const getCorrectAnswer = (index: number) => {
    const correctAnswer = data.questions[index].answers.filter(
      (a) => a.isCorrect
    )[0];
    return correctAnswer;
  };

  const getTotalAnswers = () => {
    return userAnswers.length;
  };

  const getTotalCorrectAnswers = () => {
    return userAnswers.filter((ua) => ua.answer.isCorrect).length;
  };

  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="bg-slate-100 p-12 rounded-l shadow-2xl w-full max-w-xl">
      {questionIndex < data.questions.length && (
        <form onSubmit={submitAnswer} className="flex gap-2 flex-col">
          <p className="text-xl">
          {data.questions[questionIndex].prompt}
          </p>
          <img className="h-20 w-full object-contain" src={data.questions[questionIndex].image} />
          {data.questions[questionIndex].answers.map((a, ii) => (
            <div key={"q" + questionIndex + "a" + ii}>
              <input
                type="radio"
                onChange={(e) => setSelectedAnswer(a)}
                name={"q" + questionIndex}
                value={a.text}
              />
              <label>{a.text}</label>
              <br></br>
            </div>
          ))}
          <button className="bg-gray-400" disabled={!selectedAnswer} type="submit">
            Submit
          </button>
        </form>
      )}
      {questionIndex >= data.questions.length && (
        <div>
          <div>All Done!</div>
          <div>
            Results: {getTotalCorrectAnswers()}/{getTotalAnswers()}
          </div>
          <br></br>
          {userAnswers.map((ua) => (
            <div key={ua.questionIndex}>
              {data.questions[ua.questionIndex].prompt}
              <br></br>
              <div
                className={
                  ua.answer.isCorrect ? "text-green-600" : "text-rose-500"
                }
              >
                Your Answer: {ua.answer.text}
              </div>
              {!ua.answer.isCorrect && (
                <div>
                  The Correct Answer: {getCorrectAnswer(ua.questionIndex).text}
                </div>
              )}
              <br></br>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
