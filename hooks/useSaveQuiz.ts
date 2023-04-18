import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

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

const useSaveQuiz = (quiz?: quiz) => {
  useSwr(quiz?.id ? `/api/quiz/${quiz?.id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export default useSaveQuiz;
