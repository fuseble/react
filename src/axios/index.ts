import { type AxiosInstance, type AxiosRequestConfig } from "axios";
import qs from "qs";

export interface SetAxiosProps {
  debug?: boolean;
  getTokenCallback?(): string | undefined;
  setTokenCallback?(config: AxiosRequestConfig, token: string): void;
}

export const setAxiosParamsSerializer = (client: AxiosInstance) => {
  client.defaults.paramsSerializer = (params: any) => {
    return qs.stringify(params);
  };
};

export const setAxiosLogger = (client: AxiosInstance) => {
  client.interceptors.request.use((config) => {
    console.log(`[REQUEST] [${config.method?.toUpperCase()}] ${config.url}`, {
      data: config.data,
      params: config.params,
    });

    return config;
  });

  client.interceptors.response.use(
    (response) => {
      console.log(
        `[RESPONSE] [${response.config.method?.toUpperCase()}] ${
          response.config.url
        }`,
        response.data
      );

      return response;
    },
    (error) => {
      console.log(
        `[ERROR] [${error.config.method?.toUpperCase()}] ${error.config.url}`,
        error
      );

      return Promise.reject(error);
    }
  );
};

export const setAxiosInstance = (
  client: AxiosInstance,
  { getTokenCallback, setTokenCallback, debug = false }: SetAxiosProps
) => {
  setAxiosParamsSerializer(client);
  client.interceptors.request.use((config) => {
    const token = getTokenCallback?.();
    if (token) {
      setTokenCallback?.(config, token);
    }

    return config;
  });

  if (debug) {
    setAxiosLogger(client);
  }
};
