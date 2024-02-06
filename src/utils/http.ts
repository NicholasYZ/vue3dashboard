import axios, { type AxiosRequestConfig } from "axios";
import type { AxiosResponse } from "axios";
import { storage } from "./storage";

const instance = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config: AxiosRequestConfig<any>) {
    // Do something before request is sent
    config.headers!["token"] = storage.getItem("token");
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
    if (
      error.response.status === 401 &&
      error.response.data === "access_denied"
    ) {
      window.location.href = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);

const responseBody = (response: AxiosResponse) => response.data;

export const get = async (url: string, params = {}) => {
  const response = await instance.get(url, { params });
  return responseBody(response);
};

export const post = async (url: string, params = {}) => {
  const response = await instance.post(url, params);
  return responseBody(response);
};

export const put = async (url: string, params = {}) => {
  const response = await instance.put(url, params);
  return responseBody(response);
};

export const del = async (url: string, params = {}) => {
  const response = await instance.delete(url, { params });
  return responseBody(response);
};

export const patch = async (url: string, params = {}) => {
  const response = await instance.patch(url, params);
  return responseBody(response);
};

export default {
  get,
  post,
  put,
  del,
  patch,
};
