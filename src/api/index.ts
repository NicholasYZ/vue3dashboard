import axios from "axios";
import type { AxiosResponse } from "axios";

import type { BodyProps, getProps } from "@/types";

const instance = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/xiaoqing-tan/xiaoqing-tan.github.io/master",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

export const request = {
  get: (url: string, params?: { [key: string]: string | number }) =>
    instance.get(url, { params }).then(responseBody),
  post: (url: string, body: BodyProps) =>
    instance.post(url, body).then(responseBody),
};

export const getMenu = (): Promise<any> => request.get("/menu.json");
export const getRoles = (): Promise<any> => request.get("/roles.json");
export const getList = ({ url, params }: getProps): Promise<any> => {
  return request.get(url, params);
};
export const Login = (params: any): Promise<any> => {
  return request.get("/login.json", params);
};

// export const http = axios.create({
//   baseURL: "https://reqres.in/api",
//   timeout: 15000,
// });

// export const httpRequest = {
//   get: (url: string, params?: { [key: string]: string | number }) =>
//     http.get(url, { params }).then(responseBody),
//   post: (url: string, body: BodyProps) =>
//     http.post(url, body).then(responseBody),
// };

// export const getUser = (id: string | number): Promise<any> => {
//   return httpRequest.get(`/users/${id}`);
// };

// export const getList = ({ url, params }: getProps): Promise<any> => {
//   return request.get(url, params);
// };

// export const Login = (params: LoginProps): Promise<LoginProps> =>
//   httpRequest.post("/login", params);
