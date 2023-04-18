import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

export interface results {
  data: any;
  error: any;
  isLoading: boolean;
}

const useGetQuiz = (id?: string) => {
  const { data, error, isLoading } = useSwr(id ? `/api/quiz/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const results = {
    data,
    error,
    isLoading
  } as results;

  return results;
};

export default useGetQuiz;
