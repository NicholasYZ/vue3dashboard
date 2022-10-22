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

const http = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 15000,
});

const httpRequest = {
  get: (url: string, params: { [key: string]: string | number }) =>
    http.get(url, { params }).then(responseBody),
  post: (url: string, body: BodyProps) =>
    http.post(url, body).then(responseBody),
};

export const getList = ({
  url,
  params,
}: {
  url: string;
  params: { [key: string]: string | number };
}): Promise<any> => {
  return httpRequest.get(url, params);
};

export const Login = (params: LoginProps): Promise<LoginProps> =>
  httpRequest.post("/login", params);
