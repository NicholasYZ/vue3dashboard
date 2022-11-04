import Mock from "mockjs"; // 引入mockjs
// const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据
import type { MenuProps } from "@/types";
import { menu } from "./system/menu";
import { roles } from "./system/roles";
import { users } from "./users/index";
import { user } from "./users/user";
import { products } from "./products/index";

const getQuery = (url: string, name: any) => {
  const index = url.indexOf("?");
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split("&");
    for (let i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split("=");
      if (itemArr[0] === name) {
        return itemArr[1];
      }
    }
  }
  return 1;
};
Mock.mock(/\/api\/roles/, "get", (options) => {
  const page = Number(getQuery(options.url, "page"));
  return {
    page,
    per_page: 6,
    total: 12,
    total_pages: 2,
    result: roles,
  };
});
Mock.mock(/\/api\/users\/1/, "get", user);
Mock.mock(/\/api\/users/, "get", (options) => {
  const page = Number(getQuery(options.url, "page"));
  return {
    page,
    per_page: 6,
    total: 12,
    total_pages: 2,
    result: users,
  };
});
Mock.mock(/\/api\/menu/, "get", (options) => {
  const page = Number(getQuery(options.url, "page"));
  return {
    page,
    per_page: 6,
    total: 12,
    total_pages: 2,
    result: menu,
  };
});
Mock.mock(/\/api\/products/, "get", (options) => {
  const page = Number(getQuery(options.url, "page"));
  return {
    page,
    per_page: 6,
    total: 12,
    total_pages: 2,
    result: products,
  };
});
Mock.mock("/api/login", "post", function (req: any, res: any) {
  console.log(req);
  console.log(res);
  return {
    type: 1,
    code: 200,
    msg: "登录成功",
    result: {
      token: "QpwL5tke4Pnpja7X4",
    },
  };
});
