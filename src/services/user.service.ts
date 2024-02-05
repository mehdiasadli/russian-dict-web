import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TEditUserSchema, TRegisterSchema } from '../schemas/user.schema';
import { ApiError, ICommonWord, IUser } from '../resources/types';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../store/useAuth';
import { BASE, intercept } from '.';

const publicApi = axios.create({
  baseURL: BASE + '/users',
});
const api = axios.create({
  baseURL: BASE + '/users',
});

intercept(api);

export const useRegister = () => {
  const navigate = useNavigate();
  const { error, success } = useToast();

  return useMutation<IUser, AxiosError<ApiError>, TRegisterSchema>({
    mutationKey: ['register-user'],
    mutationFn: (data) => publicApi.post('/', data).then((res) => res.data),
    retry: 0,
    onError: (err) => {
      error(err);
    },
    onSuccess: (data) => {
      navigate('/auth/login');
      success(`You registered as ${data.firstName} ${data.lastName} successfully`);
    },
  });
};

export const useManage = (removing?: boolean) => {
  const { error, success } = useToast();
  const { updateUser } = useUser();
  const queryClient = useQueryClient();

  return useMutation<IUser, AxiosError<ApiError>, { id: string; word: string }>({
    mutationKey: ['manage'],
    mutationFn: (data) => api.put('/' + data.id + '/manage').then((res) => res.data),
    retry: 0,
    onError: async (err) => {
      error<ApiError>(err);

      queryClient.invalidateQueries({
        queryKey: ['wordlist'],
      });
    },
    onSuccess: (data, vars) => {
      updateUser(data);
      success(`${vars.word} ${removing ? 'removed' : 'added'} to your vocabulary`);
      queryClient.refetchQueries();
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ['wordlist'],
      });
      const snapshot = queryClient.getQueryData(['wordlist']);

      queryClient.setQueryData(['wordlist'], (prev: ICommonWord[]) =>
        prev?.filter((word) => word._id !== data.id)
      );

      return { snapshot };
    },
  });
};

export const useUpdateUser = (close: () => void) => {
  const { user, updateUser } = useUser();
  const { error, success } = useToast();

  return useMutation<IUser, AxiosError<ApiError>, TEditUserSchema>({
    mutationKey: ['update-user'],
    mutationFn: (data) => api.put('/' + user._id, data).then((res) => res.data),
    retry: 0,
    onError: (err) => {
      error(err);
    },
    onSuccess: (data) => {
      updateUser(data);
      success('User updated successfully');
      close();
    },
  });
};
