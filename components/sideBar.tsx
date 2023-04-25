import React from "react";
import { question } from "@/models/quiz";

interface SidebarProps {
  questions: question[];
  onAddQuestion: () => void;
  onSelectQuestion: (questionIndex: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ questions, onAddQuestion, onSelectQuestion }) => {
  return (
    <div className="w-1/6 bg-slate-100 p-4 h-screen pt-24 rounded-l shadow-2xl flex gap-3 flex-col items-center">
      <ul className="text-gray-700">
        {questions.map((question, index) => (
          <li

            key={index}
            onClick={() => onSelectQuestion(index)}
          >
            {`${index + 1} Question`}
            <div className="w-full bg-slate-200 h-20">
              { question.image ? <img className="h-full w-full object-cover" src={question.image} /> : <img className="h-full w-full object-cover" src="/images/default-question.jpg" /> }
            </div>
          </li>
        ))}
      </ul>
      <button onClick={onAddQuestion} className="bg-blue-700 text-white p-1 w-full">Add Question</button>
    </div>
  );
};

export default Sidebar;
