import axios from "axios";
import type { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

export const request = {
  get: (url: string, params = {}) =>
    instance.get(url, { params }).then(responseBody),
  post: (url: string, body = {}) => instance.post(url, body).then(responseBody),
};
