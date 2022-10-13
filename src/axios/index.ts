import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { stringify } from 'query-string';

export const createAxiosInstance = (options?: CreateAxiosDefaults): AxiosInstance => {
  return axios.create({
    timeout: 1000 * 5,
    withCredentials: true,
    paramsSerializer: {
      encode: (value) => stringify(value)
    },
    ...(options ?? {})
  });
};

export const setAxiosLogger = (instance: AxiosInstance, isLogger?: boolean) => {
  if (!isLogger) return;

  instance.interceptors.request.use(
    (config) => {
      console.log(`[Request][${config.method?.toUpperCase()}] ${config.url}`, {
        data: config.data,
        params: config.params
      });

      return config;
    },
    (error) => {
      console.error('[Request][Error]', error);

      return error;
    }
  );

  instance.interceptors.response.use(
    (response) => {
      console.log(`[Response][${response.status}] ${response.config.url}`, response.data);
      return response;
    },
    (error) => {
      console.log(`[Response][Error] ${error.config.url}`, error);
      return error;
    }
  );
};
