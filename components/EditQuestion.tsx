import { useEffect, useState } from "react";

export interface question {
  answers: answer[];
  image: string;
  prompt: string;
  description: string;
}

interface Question {
  data: question | null;
}

export interface answer {
  text: string;
  isCorrect: boolean;
}

const EditQuestion: React.FC<Question> = ({ data }) => {
  const [prompt, setPrompt] = useState(data?.prompt);
  const [img, setImg] = useState(data?.image);
  const [answers, setAnswers] = useState(data?.answers)

  return (
    <div className="bg-blue-700">
      <label>Prompt</label>
      <input
        className="text-black"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br></br>
      {img && (
        <div>
          <label>image</label>
          <img className="w-10" src={img} />
        </div>
      )}
      {
        answers?.map((answer, i) => <input className="text-black" key={i} value={answers[i].text}/>)
      }

    </div>
  );
};

export default EditQuestion;
