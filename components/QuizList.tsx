import QuizCard from './QuizCard';
import { isEmpty } from 'lodash';

interface QuizListProps {
  data: Record<string, any>[]
  title: string
}

const QuizList: React.FC<QuizListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((quiz) => (
            <QuizCard key={quiz.id} data={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default QuizList;
