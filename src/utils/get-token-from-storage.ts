import { IUser } from '../resources/types';

export const getTokenFromStorage = () => {
  const userData = localStorage.getItem('user_data');

  if (!userData) return null;

  const user = JSON.parse(userData) as
    | {
        version: number;
        state: { token: string; user: IUser };
      }
    | null
    | undefined;

  if (!user || !user.state || !user.state.token) return null;

  return user.state.token;
};
