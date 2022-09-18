import axios, { AxiosError } from 'axios';
import appConfig from '@/config';

// 서버 주소 입력
export const baseURL = appConfig.API_URL;

const apiClient = axios.create({
  baseURL,
  timeout: 3000,
});

apiClient.interceptors.request.use((config) => {
  // const token = sessionStorage.getItem('token');
  // if (token) config.headers.Authorization = `Token token=${token}`;
  return config;
});

export default apiClient;

export const isAxiosError = <E>(err: unknown | AxiosError<E>): err is AxiosError<E> => {
  return axios.isAxiosError(err);
};
