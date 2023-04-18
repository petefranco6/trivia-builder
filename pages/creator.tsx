import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Sidebar from "@/components/sideBar";
import ImageInput from "@/components/ImageInput";
import useCurrentUser from "@/hooks/useCurrentUser";

interface Answer {
  isCorrect: boolean;
  text: string;
}

export interface Question {
  prompt: string;
  answers: Answer[];
  image: string;
  correctAnswer: number;
}

const initialQuestions: Question[] = [
  {
    prompt: "What is the capital of France?",
    answers: [
      { isCorrect: false, text: "paris" },
      { isCorrect: true, text: "London" },
      { isCorrect: false, text: "Berlin" },
      { isCorrect: false, text: "Madrid" },
    ],
    image: "",
    correctAnswer: 1,
  },
  {
    prompt: "What is the largest country in the world by area?",
    answers: [
      { isCorrect: true, text: "china" },
      { isCorrect: false, text: "russia" },
      { isCorrect: false, text: "korea" },
      { isCorrect: false, text: "canada" },
    ],
    image: "",
    correctAnswer: 0,
  },
];

const creator: React.FC = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const { data: user } = useCurrentUser();

  const handleAddQuestion = () => {
    const newQuestion = {
      prompt: "",
      answers: [
        { isCorrect: false, text: "" },
        { isCorrect: false, text: "" },
        { isCorrect: false, text: "" },
        { isCorrect: false, text: "" },
      ],
      image: "",
      correctAnswer: 0,
    };
    const newQuestions = [...questions, newQuestion];
    setQuestions(newQuestions);
    const newQuestionIndex = newQuestions.length - 1;
    setSelectedQuestionIndex(newQuestionIndex);
  };

  const handleSelectQuestion = (questionIndex: number) => {
    setSelectedQuestionIndex(questionIndex);
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].prompt = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (
    questionIndex: number,
    field: string,
    value: any
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === questionIndex ? { ...question, [field]: value } : question
      )
    );
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    handleQuestionChange(questionIndex, "correctAnswer", answerIndex);
  };

  const handleImageChange = (value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].image = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(user.id);
    try {
      const response = await axios.post("/api/create", {
        name,
        category,
        description,
        questions,
        authorId: user.id,
      });

      if(response.status >= 200 && response.status <= 299) {
        router.push("/");
      }

    } catch (error) {
      console.error(error);
    }
  };
  const selectedQuestion = questions[selectedQuestionIndex];

  return (
    <div className="w-full h-screen flex gap-1">
      <Sidebar
        questions={questions}
        onAddQuestion={handleAddQuestion}
        onSelectQuestion={handleSelectQuestion}
      />
      <div className="flex gap-1 w-full justify-center items-center">
        <form
          className="bg-slate-100 p-10 rounded-l shadow-2xl w-full h-full max-w-3xl pt-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center gap-3 flex-col"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full rounded-md p-2"
            onChange={handlePromptChange}
            value={selectedQuestion.prompt}
            placeholder="Prompt Here"
          />
          <div>
            {!selectedQuestion.image && (
              <ImageInput
                value={selectedQuestion.image}
                onChange={handleImageChange}
              />
            )}
            {selectedQuestion.image && <img className="rounded-md w-full max-h-48 object-contain" src={selectedQuestion.image} />}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {selectedQuestion.answers.map((answer, answerIndex) => (
              <label key={answerIndex} className="block">
                <input
                  type="radio"
                  name={`question-${selectedQuestionIndex}-answer`}
                  checked={selectedQuestion.correctAnswer === answerIndex}
                  onChange={() =>
                    handleAnswerChange(selectedQuestionIndex, answerIndex)
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
                    handleQuestionChange(selectedQuestionIndex, "answers", [
                      ...selectedQuestion.answers.slice(0, answerIndex),
                      { text: event.target.value },
                      ...selectedQuestion.answers.slice(answerIndex + 1),
                    ])
                  }
                  className="border rounded-lg border-gray-300 text-base px-4 py-2 w-full mt-2"
                />
              </label>
            ))}
          </div>
          <div className="gap-2 flex">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="category"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/2"
            type="submit"
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};

export default creator;
