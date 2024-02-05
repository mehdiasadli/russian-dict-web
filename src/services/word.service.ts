import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ApiError, ICommonWord } from '../resources/types';
import { useSearch } from '../store/useSearch';
import { useEffect } from 'react';
import { BASE, intercept } from '.';

const api = axios.create({
  baseURL: BASE + '/words',
});

intercept(api);

export const useWord = (id?: string) => {
  return useQuery<ICommonWord, ApiError>({
    queryKey: ['wordlist', id],
    queryFn: () => api.get('/' + id).then((res) => res.data),
    enabled: Boolean(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
};

export const useFindWord = <T = ICommonWord[]>(word?: string | string[]) => {
  return useQuery<T, ApiError>({
    queryKey: ['wordlist', word],
    queryFn: () =>
      api
        .get('/word', {
          params: {
            query: !word || typeof word === 'string' ? word : word.join(','),
          },
        })
        .then((res) => res.data),
    enabled: Boolean(word),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
};

export const useWords = (options: { packet?: 'learning' | 'knows'; user?: string } = {}) => {
  const { searchQuery, limit, pos, sortBy, dir } = useSearch();

  const query = useInfiniteQuery<{ result: ICommonWord[]; isLastPage: boolean }, ApiError>({
    queryKey: ['wordlist', options.packet],
    queryFn: ({ pageParam = 1 }) =>
      api
        .get('/', {
          params: {
            search: searchQuery,
            dir,
            limit,
            page: pageParam,
            sortBy,
            pos,
            packet: options.packet,
            user: options.user,
          },
        })
        .then((res) => res.data),
    getNextPageParam: (lp, p) => {
      return !lp.isLastPage ? p.length + 1 : undefined;
    },
    initialPageParam: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });

  useEffect(() => {
    query.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, limit, pos, sortBy, dir]);

  return query;
};
