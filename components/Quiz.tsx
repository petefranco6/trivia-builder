import { isEmpty } from "lodash";
import { useState } from "react";
import Link from "next/link";

export interface quiz {
  category: string;
  description: string;
  id: string;
  name: string;
  questions: question[];
}

export interface question {
  answers: answer[];
  image: string;
  prompt: string;
}

export interface answer {
  text: string;
  isCorrect: boolean;
}

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
    <div>
      {questionIndex < data.questions.length && (
        <form onSubmit={submitAnswer}>
          {data.questions[questionIndex].prompt}
          <img className="w-10" src={data.questions[questionIndex].image} />
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
          <button disabled={!selectedAnswer} type="submit">
            Submit
          </button>
        </form>
      )}
      {questionIndex >= data.questions.length && (
        <div>
          <Link href={"/"} className="bg-blue-600 py-3 text-white rounded-md mt-10 hover:bg-blue-700 transition ">Home</Link>
          <br></br>
          <br></br>
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
