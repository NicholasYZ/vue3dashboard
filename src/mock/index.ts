import Mock from "mockjs"; // 引入mockjs
// const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据
import type { MenuProps } from "@/types";

// console.log(Mock.Random.first());

const login = {
  username: "admin",
  role: "admin",
  password: "Iamxiaoqing@0",
  token: "login:ok",
};

const menu: MenuProps[] = [
  {
    id: 1,
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
        id: 11,
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
        id: 12,
        name: "components.form",
        path: "/components/form",
        component: "components/FormView",
        meta: {
          title: "表单",
          icon: "DocumentCopy",
          permissions: ["admin"],
        },
      },
      {
        id: 13,
        name: "components.charts",
        path: "/components/charts",
        component: "components/ChartsView",
        meta: {
          title: "表单",
          icon: "DocumentCopy",
          permissions: ["admin"],
        },
      },
      {
        id: 14,
        name: "components.icons",
        path: "/components/icons",
        component: "components/IconsView",
        meta: {
          title: "表单",
          icon: "DocumentCopy",
          permissions: ["admin"],
        },
      },
    ],
  },
  {
    id: 2,
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
        id: 21,
        name: "setting.info",
        path: "/setting/info",
        component: "setting/InfoView",
        meta: {
          title: "个人中心",
          icon: "User",
          permissions: ["admin"],
        },
      },
      {
        id: 22,
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
        id: 23,
        name: "setting.menu",
        path: "/setting/menu",
        component: "setting/MenuView",
        meta: {
          title: "菜单管理",
          icon: "Menu",
          permissions: ["admin"],
        },
      },
      {
        id: 24,
        name: "setting.users",
        path: "/setting/users",
        component: "setting/UsersView",
        meta: {
          title: "菜单管理",
          icon: "Avatar",
          permissions: ["admin"],
        },
      },
    ],
  },
];

const roles: any[] = [
  {
    id: 1,
    type: "admin",
  },
  {
    id: 2,
    type: "editor",
  },
  {
    id: 3,
    type: "vistor",
  },
];

Mock.mock("/api/roles", "get", roles);
Mock.mock("/api/menu", "get", menu);
Mock.mock("/api/login", "post", login);
