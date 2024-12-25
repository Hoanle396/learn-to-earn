import { appConfig } from '@/configs';
import { Storage } from '@/libs/constants';
import { getLocalStore, setLocalStore } from '@/libs/utils';
import {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import Router from 'next/router';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: appConfig.apiUrl,
  responseType: 'json',
};

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getLocalStore(Storage.ACCESS_TOKEN);
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response.data;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  const data = error?.response;
  const originalRequest = error.config;
  const isTokenExpired = error?.response?.status === 401;
  const refreshToken = getLocalStore(Storage.REFRESH_TOKEN);
  if (error.response && isTokenExpired && refreshToken && !originalRequest?.url?.includes('/auth/refresh-token')) {
    try {
      const { data } = await axios({
        baseURL: appConfig.apiUrl,
        method: 'POST',
        url: '/auth/refresh-token',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      setLocalStore(Storage.ACCESS_TOKEN, data.data.accessToken);
      setLocalStore(Storage.REFRESH_TOKEN, data.data.accessToken);

      const request = {
        ...originalRequest,
        headers: {
          ...originalRequest?.headers,
          Authorization: `Bearer ${data.data.accessToken}`,
        },
      };
      return await client(request);
    } catch (error) {
      Router.push('/logout');
      return Promise.reject(data);
    }
  }
  return Promise.reject(data);
};

const client: AxiosInstance = axios.create(axiosRequestConfig);

client.interceptors.request.use(requestInterceptor);
client.interceptors.response.use(successInterceptor, errorInterceptor);

export default client;
