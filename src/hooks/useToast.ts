import { AxiosError } from 'axios';
import { ApiError } from '../resources/types';
import { toast } from 'sonner';

export const useToast = () => {
  return {
    error: <E = ApiError>(err: AxiosError<E>) => {
      const e = err.response?.data as ApiError;

      toast.error(e.message || 'Something went wrong');
    },
    success: (message: string) => {
      toast.success(message);
    },
  };
};
