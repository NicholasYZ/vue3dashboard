import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import type { BodyProps } from "@/types";
import { storage } from "@/utils";

const instance = axios.create({
  baseURL: "/api/fake",
  timeout: 15000,
});

instance.interceptors.request.use(
  function (config: AxiosRequestConfig<any>) {
    config.headers!["token"] = storage.getItem("token");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse<any, any>) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

export const request = {
  get: (url: string, params?: { [key: string]: string | number }) =>
    instance.get(url, { params }).then(responseBody),
  post: (url: string, body: BodyProps) =>
    instance.post(url, body).then(responseBody),
};
