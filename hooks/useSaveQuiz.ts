import useSwr from 'swr'
import fetcher from '@/lib/fetcher';
import { quiz, question, answer } from "@/models/quiz";

const useSaveQuiz = (quiz?: quiz) => {
  useSwr(quiz?.id ? `/api/quiz/${quiz?.id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export default useSaveQuiz;
