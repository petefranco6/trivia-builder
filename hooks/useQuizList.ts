import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useQuizList = () => {
  const { data, error, isLoading } = useSwr('/api/quizzes', fetcher, {
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

export default useQuizList;
