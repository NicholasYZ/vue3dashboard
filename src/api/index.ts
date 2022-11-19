import axios from "axios";
import type { AxiosResponse } from "axios";

import type { BodyProps, getProps } from "@/types";

const instance = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

export const request = {
  get: (url: string, params?: { [key: string]: string | number }) =>
    instance.get(url, { params }).then(responseBody),
  post: (url: string, body: BodyProps) =>
    instance.post(url, body).then(responseBody),
};

export const getMenu = (): Promise<any> => request.get("/menu");
export const getList = ({ path, query }: getProps): Promise<any> => {
  return request.get(path, query);
};
export const Login = (params: any): Promise<any> => {
  return request.post("/login", params);
};

export const GetUserInfo = (): Promise<any> => {
  return request.get("/get-user-info");
};
