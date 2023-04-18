import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useQuiz = (id?: string) => {
  const { data, error, isLoading } = useSwr(id ? `/api/quizzes/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useQuiz;
