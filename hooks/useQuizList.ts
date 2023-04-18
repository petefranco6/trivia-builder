import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useQuizList = () => {
  const { data, error, isLoading } = useSwr('/api/quizzes', fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useQuizList;
