import axios from "axios";
import type { AxiosResponse } from "axios";

import type { MenuProps, LoginProps, BodyProps } from "@/types";

const instance = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: BodyProps) =>
    instance.post(url, body).then(responseBody),
};

export const getMenu = (): Promise<MenuProps[]> => request.get("/menu");
export const Login = (params: LoginProps): Promise<LoginProps> =>
  request.post("/login", params);

const http = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 15000,
});

const httpRequest = {
  get: (url: string) => http.get(url).then(responseBody),
  post: (url: string, body: BodyProps) =>
    http.post(url, body).then(responseBody),
};

export const getList = (num: number): Promise<any> =>
  httpRequest.get(`/list?page=${num}`);
