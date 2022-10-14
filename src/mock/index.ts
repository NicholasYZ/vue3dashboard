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
    name: "components.index",
    path: "/components",
    component: "layouts/MainLayout",
    redirect: "/components/list",
    meta: {
      title: "组件",
      icon: "Operation",
      permissions: ["admin", "editor"],
    },
    children: [
      {
        name: "components.list",
        path: "/components/list",
        component: "components/ListView",
        meta: {
          title: "列表",
          icon: "List",
          permissions: ["admin"],
        },
      },
      {
        name: "components.form",
        path: "/components/form",
        component: "components/FormView",
        meta: {
          title: "表单",
          icon: "DocumentCopy",
          permissions: ["admin"],
        },
      },
    ],
  },
  {
    name: "setting.index",
    path: "/setting",
    component: "layouts/MainLayout",
    redirect: "setting/info",
    meta: {
      title: "设置",
      icon: "Setting",
      permissions: ["admin"],
    },
    children: [
      {
        name: "setting.info",
        path: "/setting/info",
        component: "setting/InfoView",
        meta: {
          title: "用户信息",
          icon: "User",
          permissions: ["admin"],
        },
      },
      {
        name: "setting.role",
        path: "/setting/role",
        component: "setting/RoleView",
        meta: {
          title: "角色管理",
          icon: "Monitor",
          permissions: ["admin"],
        },
      },
      {
        name: "setting.menu",
        path: "/setting/menu",
        component: "setting/MenuView",
        meta: {
          title: "菜单管理",
          icon: "Menu",
          permissions: ["admin"],
        },
      },
    ],
  },
];

Mock.mock("/api/menu", "get", menu);
Mock.mock("/api/login", "post", login);
