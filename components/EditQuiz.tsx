import { isEmpty } from "lodash";
import axios from "axios";
import Link from "next/link";
import { quiz, question, answer } from "@/models/quiz";
import Sidebar from "./sideBar";
import { useState } from "react";
import ImageInput from "@/components/ImageInput";
import { useRouter } from "next/router";

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
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const router = useRouter();

  const addQuestion = () => {
    questionAdded({
      answers: [],
      image: "",
      prompt: "",
    });
  };

  const handleSelectQuestion = (questionIndex: number) => {
    setSelectedQuestionIndex(questionIndex);
  };

  const updateQuiz = async () => {
    console.log("data to save", data);
    try {
      const response = await axios.put("/api/save", {
        data,
      });

      if(response.status == 200) {
        router.push("/");
      }
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

  const handleImageChange = (value: string) => {
    changeImage(selectedQuestionIndex, value)
  };

  if (isEmpty(data)) {
    return null;
  }

  const selectedQuestion = data.questions[selectedQuestionIndex];

  return (
    <>
      <Sidebar
        questions={data.questions}
        onAddQuestion={addQuestion}
        onSelectQuestion={handleSelectQuestion}
      />
      <div className="flex gap-1 w-full justify-center items-center">
        <div className=" p-10 rounded-l shadow-2xl w-full h-full max-w-3xl pt-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex-col flex gap-1 justify-center items-center">
          <input
            className="w-full rounded-md"
            onChange={(e) =>
              changePrompt(selectedQuestionIndex, e.target.value)
            }
            value={selectedQuestion.prompt}
            placeholder="Prompt Here"
          />
          {/* <input
            className="w-full px-4 py-2 mr-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="text"
            value={selectedQuestion.image}
            onChange={(e) => changeImage(selectedQuestionIndex, e.target.value)}
            placeholder="Enter Image Source"
          /> */}
          <div>
            <ImageInput
              value={selectedQuestion.image}
              onChange={handleImageChange}
            />
          </div>
          <span>
            <img className="w-10 rounded-md" src={selectedQuestion.image} />
          </span>
          <div className="grid grid-cols-2 gap-3">
            {selectedQuestion.answers.map((answer, answerIndex) => (
              <label key={answerIndex} className="block">
                <input
                  type="radio"
                  name={`question-${selectedQuestionIndex}-answer`}
                  onChange={() =>
                    changeIsCorrectAnswer(selectedQuestionIndex, answerIndex)
                  }
                  className="mr-2"
                />
                <span className="text-gray-700 font-bold">
                  {`Answer ${answerIndex + 1}`}
                </span>
                <input
                  type="text"
                  value={answer.text}
                  onChange={(event) =>
                    changeAnswerText(
                      selectedQuestionIndex,
                      answerIndex,
                      event.target.value
                    )
                  }
                  className="border rounded-lg border-gray-300 text-base px-4 py-2 w-full mt-2"
                />
              </label>
            ))}
          </div>
          <button
            onClick={updateQuiz}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Update Quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
