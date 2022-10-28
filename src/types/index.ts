export interface MenuProps {
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
