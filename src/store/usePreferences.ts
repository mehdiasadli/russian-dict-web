import { ColorScheme } from '@mantine/core';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UsePreferencesState {
  scheme: ColorScheme;
}

interface UsePreferencesActions {
  toggle: () => void;
}

const initial: UsePreferencesState = {
  scheme: 'light',
};

export const usePreferences = create<UsePreferencesState & UsePreferencesActions>()(
  persist(
    (set) => ({
      ...initial,

      toggle: () =>
        set((state) => ({ ...state, scheme: state.scheme === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'preferences_data' }
  )
);
