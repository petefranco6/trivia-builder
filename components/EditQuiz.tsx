import { isEmpty } from "lodash";
import axios from "axios";
import Link from "next/link";
import { quiz, question, answer } from "@/models/quiz";

export interface userAnswer {
  questionIndex: number;
  answer: answer;
}

interface Quiz {
  data: quiz | null;
  questionAdded: (question: question) => void;
  answerAdded: (questionIndex: number, answer: answer) => void;
  promptChanged: (questionIndex: number, prompt: string) => void;
  imageChanged: (questionIndex: number, image: string) => void;
  answerTextChanged: (
    questionIndex: number,
    answerIndex: number,
    text: string
  ) => void;
  answerIsCorrectChanged: (questionIndex: number, answerIndex: number) => void;
}

const Quiz: React.FC<Quiz> = ({
  data,
  questionAdded,
  answerAdded,
  promptChanged,
  imageChanged,
  answerTextChanged,
  answerIsCorrectChanged,
}) => {
  const addQuestion = () => {
    questionAdded({
      answers: [],
      description: "",
      image: "",
      prompt: "",
    });
  };

  const updateQuiz = async () => {
    console.log("data to save", data);
    try {
      await axios.put("/api/save", {
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addAnswer = (event: any, questionIndex: number) => {
    event.preventDefault();

    answerAdded(questionIndex, {
      text: "",
      isCorrect: false,
    });
  };

  const changePrompt = (questionIndex: number, prompt: string) => {
    promptChanged(questionIndex, prompt);
  };

  const changeImage = (questionIndex: number, image: string) => {
    imageChanged(questionIndex, image);
  };

  const changeAnswerText = (
    questionIndex: number,
    answerIndex: number,
    text: string
  ) => {
    answerTextChanged(questionIndex, answerIndex, text);
  };

  const changeIsCorrectAnswer = (
    questionIndex: number,
    answerIndex: number
  ) => {
    answerIsCorrectChanged(questionIndex, answerIndex);
  };

  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="bg-gray-100 p-12 rounded-lg shadow-2xl h-full w-full pt-20 text-gray-800">
  {data.questions.map((question, i) => (
    <div className="text-black mb-8" key={"q" + i}>
      <div className="mb-4">
        <span>{`Question ${i + 1}`}</span>
        <input
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          type="text"
          value={question.prompt}
          onChange={(event) => changePrompt(i, event.target.value)}
          placeholder="Enter Question"
        />
      </div>
      <div className="flex items-center mb-4">
        <input
          className="w-full px-4 py-2 mr-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          type="text"
          value={question.image}
          onChange={(e) => changeImage(i, e.target.value)}
          placeholder="Enter Image Source"
        />
        <span>
          <img className="w-10 rounded-md" src={question.image} />
        </span>
      </div>
      {question.answers.map((a, ii) => (
        <div className="flex items-center mb-4" key={"q" + i + "a" + ii}>
          <div className="flex items-center mr-4">
            <input
              className="w-6 h-6 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="checkbox"
              value={a.text}
              checked={a.isCorrect}
              onChange={() => changeIsCorrectAnswer(i, ii)}
            />
          </div>
          <input
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="text"
            value={a.text}
            placeholder="Enter Answer"
            onChange={(e) => changeAnswerText(i, ii, e.target.value)}
          />
        </div>
      ))}
      <div>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={(e) => addAnswer(e, i)}
        >
          Add Answer
        </button>
      </div>
    </div>
  ))}
  <div className="text-white">
    <button
      className="bg-blue-600 text-white py-2 px-4 rounded-md mr-4"
      onClick={addQuestion}
    >
      Add Question
    </button>
    <button
      onClick={updateQuiz}
      className="bg-blue-600 text-white py-2 px-4 rounded-md"
    >
      Update Quiz
    </button>
  </div>
</div>

  );
};

export default Quiz;
