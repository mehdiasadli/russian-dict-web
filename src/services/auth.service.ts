import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ApiError, IUser } from '../resources/types';
import { useUser } from '../store/useAuth';
import { useToast } from '../hooks/useToast';
import { TLoginSchema } from '../schemas/auth.schema';
import { BASE } from '.';

const api = axios.create({
  baseURL: BASE + '/auth',
});

export const useLogin = () => {
  const { setUser } = useUser();
  const { error } = useToast();

  return useMutation<{ user: IUser; token: string }, AxiosError<ApiError>, TLoginSchema>({
    mutationKey: ['login-user'],
    mutationFn: (data) => api.post('/login', data).then((res) => res.data),
    retry: 0,
    onError: (err) => {
      error(err);
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });
};
