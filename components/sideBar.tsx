import React from "react";
import { Question } from "@/pages/creator";

interface SidebarProps {
  questions: Question[];
  onAddQuestion: () => void;
  onSelectQuestion: (questionIndex: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ questions, onAddQuestion, onSelectQuestion }) => {
  return (
    <div className="w-60">
      <ul>
        {questions.map((question, index) => (
          <li
            className="text-white"
            key={index}
            onClick={() => onSelectQuestion(index)}
          >
            {index + 1}
            {<img className="w-full" src={question.image} />}
          </li>
        ))}
      </ul>
      <button onClick={onAddQuestion} className="bg-red-700 text-white">Add Question</button>
    </div>
  );
};

export default Sidebar;
