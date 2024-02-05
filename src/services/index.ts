import { AxiosInstance } from 'axios';
import { getTokenFromStorage } from '../utils/get-token-from-storage';

export const intercept = (api: AxiosInstance) => {
  api.interceptors.request.use((config) => {
    const token = getTokenFromStorage();

    if (!token) return config;
    config.headers.Authorization = 'Bearer ' + token;

    return config;
  });
};

export const BASE = import.meta.env.VITE_APP_API;
