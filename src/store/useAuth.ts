import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '../resources/types';

interface UseAuthState {
  token: string;
  user: IUser | null;
}
interface UseAuthActions {
  setUser: (data: { token: string; user: IUser }) => void;
  updateUser: (data: IUser) => void;
  logout: () => void;
}

const initial: UseAuthState = {
  token: '',
  user: null,
};

const useAuth = create<UseAuthState & UseAuthActions>()(
  persist(
    (set) => ({
      ...initial,

      setUser: (data) => set({ token: data.token, user: data.user }),
      updateUser: (data) => set((state) => ({ ...state, user: data })),
      logout: () => set(initial),
    }),
    { name: 'user_data' }
  )
);

export const useUser = <F extends boolean, L extends boolean, K extends boolean>() => {
  const { user, ...rest } = useAuth();

  return {
    user: user as IUser<F, L, K>,
    ...rest,
  };
};
