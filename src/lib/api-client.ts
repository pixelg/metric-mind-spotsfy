import Axios, { InternalAxiosRequestConfig } from "axios";

import { env } from '@/config/env';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    config.headers.Accept = 'application/json';
  }

  return config;
}

export const api = Axios.create({
  baseURL: env.apiUrl,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    // TODO: Add notifications
    console.error(message);

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo = searchParams.get('redirectTo');
      window.location.href = "/auth/login?redirectTo=" + redirectTo;
    }

    return Promise.reject(error);
  },
);
