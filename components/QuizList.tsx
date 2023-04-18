import QuizCard from './QuizCard';
import { isEmpty } from 'lodash';
import { quiz, question, answer } from "@/models/quiz";
import { useState, useEffect } from 'react';

interface QuizListProps {
  data: quiz[]
  title: string
}

const QuizList: React.FC<QuizListProps> = ({ data, title }) => {
  const [quizzes, setQuizzes] = useState<quiz[] | null>(null);

  useEffect(() => {
    setQuizzes(data);
  }, [data]);

  if (isEmpty(quizzes)) {
    return null;
  }

  const removeCard = (quiz: quiz) => {
    if(quizzes) {
      setQuizzes(quizzes.filter(q => q.id !== quiz.id));
    }
  }

  return (
    <div className="p-12 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="grid grid-cols-4 gap-2">
          {quizzes?.map((quiz) => (
            <QuizCard key={quiz.id} data={quiz} onDelete={removeCard}/>
          ))}
        </div>
      </div>
    </div>
  );
}
export default QuizList;
