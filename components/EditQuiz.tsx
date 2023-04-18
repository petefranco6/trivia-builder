import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import EditQuestion from "./EditQuestion";

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
  description: string;
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
  data: quiz | null;
  questionAdded: (question: question) => void;
  answerAdded: (questionIndex: number, answer: answer) => void;
}

const Quiz: React.FC<Quiz> = ({ data, questionAdded, answerAdded }) => {
  const [questions, setQuestions] = useState(data?.questions)

  const addQuestion = () => {
    questionAdded({
      answers: [],
      description: "",
      image: "",
      prompt: "",
    });
  };

  const updateQuiz = useCallback(async () => {
    try {
      await axios.put("/api/edit", {

      })
    } catch (error) {
      console.log(error)
    }
  },[])

  const addAnswer = (event: any, questionIndex: number) => {
    event.preventDefault();

    answerAdded(questionIndex, {
      text: "",
      isCorrect: false,
    });
  };

  if (isEmpty(data)) {
    return null;
  }

  return (
    <div>
      {data.questions.map((question, i) => (
        <div className="text-black" key={"q" + i}>
          <div>
            <input
              type="text"
              value={question.prompt}
              placeholder="Prompt"
            />
          </div>
          <div>
            <input
              type="text"
              value={question.description}
              placeholder="Description"
            ></input>
          </div>
          <div>
            <input
              type="text"
              value={question.image}
              placeholder="Image Source"
            ></input>
            <span>
              <img className="w-10" src={question.image} />
            </span>
          </div>
          {question.answers.map((a, ii) => (
            <div key={"q" + i + "a" + ii}>
              <input type="text" value={a.text} placeholder="An Answer"></input>
              <label className="text-white">
                is correct?
                <input type="checkbox" value={a.text} checked={a.isCorrect}></input>
              </label>
            </div>
          ))}
          <div>
            <div>
              <button className="text-white" onClick={(e) => addAnswer(e, i)}>
                + Add Answer
              </button>
            </div>
          </div>
          <br></br>
          <br></br>
        </div>
      ))}
      <div>
        <button onClick={addQuestion}>+ Add Question</button>
      </div>
      <div>
        <button onClick={updateQuiz} className="text-white">
          Update Quiz
        </button>
      </div>
    </div>
  );
};

export default Quiz;
