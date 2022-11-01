import axios from "axios";
import type { AxiosResponse } from "axios";

import type { MenuProps, LoginProps, BodyProps, getProps } from "@/types";

const instance = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

export const request = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: BodyProps) =>
    instance.post(url, body).then(responseBody),
};

export const getMenu = (): Promise<MenuProps[]> => request.get("/menu");
export const getRoles = (): Promise<MenuProps[]> => request.get("/roles");

export const http = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 15000,
});

export const httpRequest = {
  get: (url: string, params?: { [key: string]: string | number }) =>
    http.get(url, { params }).then(responseBody),
  post: (url: string, body: BodyProps) =>
    http.post(url, body).then(responseBody),
};

export const getUser = (id: string | number): Promise<any> => {
  return httpRequest.get(`/users/${id}`);
};

export const getList = ({ url, params }: getProps): Promise<any> => {
  return httpRequest.get(url, params);
};

export const Login = (params: LoginProps): Promise<LoginProps> =>
  httpRequest.post("/login", params);
