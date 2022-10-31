import type { InjectionKey } from "vue";

export interface MenuProps {
  id: number;
  name?: string;
  path: string;
  component: string;
  redirect?: string;
  children?: MenuProps[];
  meta: {
    title?: string;
    icon?: string;
    permissions?: string[];
  };
}

export interface LoginProps {
  username: string;
  password: string;
  token?: string;
}

export interface BodyProps {
  [key: string]: any;
}

export interface ObjProps {
  [key: string]: any;
}
export const ListKey: InjectionKey<{ [key: string]: any }> = Symbol("list");
