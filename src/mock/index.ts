import Mock from "mockjs"; // 引入mockjs
// const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据
import type { MenuProps } from "@/types";

const login = {
  username: "admin",
  role: "admin",
  password: "Iamxiaoqing@0",
  token: "login:ok",
};

const menu: MenuProps[] = [
  {
    name: "components",
    path: "/components",
    component: "layouts/MainLayout",
    redirect: "components/userinfo",
    meta: {
      title: "组件",
      icon: "Setting",
      permissions: ["admin", "editor"],
    },
    children: [
      {
        name: "components-info",
        path: "/components/userinfo",
        component: "setting/UserInfo",
        meta: {
          title: "用户信息",
          icon: "User",
          permissions: ["admin"],
        },
      },
      {
        name: "components-role",
        path: "/components/userrole",
        component: "setting/UserRole",
        meta: {
          title: "用户角色",
          icon: "Monitor",
          permissions: ["admin"],
        },
      },
    ],
  },
  {
    name: "setting",
    path: "/setting",
    component: "layouts/MainLayout",
    redirect: "setting/user",
    meta: {
      title: "设置",
      icon: "Setting",
      permissions: ["admin"],
    },
    children: [
      {
        name: "user-info",
        path: "/setting/userinfo",
        component: "setting/UserInfo",
        meta: {
          title: "用户信息",
          icon: "User",
          permissions: ["admin"],
        },
      },
      {
        name: "user-role",
        path: "/setting/userrole",
        component: "setting/UserRole",
        meta: {
          title: "用户角色",
          icon: "Monitor",
          permissions: ["admin"],
        },
      },
    ],
  },
];

Mock.mock("/api/menu", "get", menu);
Mock.mock("/api/login", "post", login);
