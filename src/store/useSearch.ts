import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { POS } from '../resources/types';

interface UseSearchState {
  searchQuery: string;
  page: number;
  limit: number;
  pos: POS | null;
  sortBy: 'rank' | 'abc';
  dir: 'asc' | 'desc';
}

interface UseSearchActions {
  onSearchInput: (input: string) => void;
  resetSearch: () => void;
  changePage: (newPage: number) => void;
  changeDir: (newDir: 'asc' | 'desc') => void;
  changeSortBy: (newSortBy: 'rank' | 'abc') => void;
  changeLimit: (newLimit: number) => void;
  changePos: (newPos: POS | 'all') => void;
}

const initial: UseSearchState = {
  searchQuery: '',
  page: 1,
  limit: 50,
  pos: null,
  dir: 'asc',
  sortBy: 'rank',
};

export const useSearch = create<UseSearchState & UseSearchActions>()(
  persist(
    (set) => ({
      ...initial,

      onSearchInput: (input) => set((state) => ({ ...state, searchQuery: input })),
      resetSearch: () => set((state) => ({ ...state, searchQuery: '' })),
      changePage: (newPage) => set((state) => ({ ...state, page: newPage })),
      changeLimit: (newLimit) => set((state) => ({ ...state, limit: newLimit })),
      changeDir: (newDir) => set((state) => ({ ...state, dir: newDir })),
      changeSortBy: (newSortBy) => set((state) => ({ ...state, sortBy: newSortBy })),
      changePos: (newPos) => set((state) => ({ ...state, pos: newPos === 'all' ? null : newPos })),
    }),
    {
      name: 'options_data',
      partialize: (state) => ({
        limit: state.limit,
        dir: state.dir,
        sortBy: state.sortBy,
      }),
    }
  )
);
