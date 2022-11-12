import type { RouteRecordRaw } from "vue-router";

export const IndexRoute: RouteRecordRaw = {
  path: "/",
  name: "layout",
  component: () => import("@/views/layouts/BaseLayout.vue"),
  redirect: "/index",
  meta: {
    permissions: ["admin", "editor"],
  },
  children: [
    {
      path: "/index",
      component: () => import("@/views/index/HomeView.vue"),
      name: "home",
      meta: {
        title: "首页",
        icon: "index",
        permissions: ["admin", "editor"],
      },
    },
  ],
};

export const LoginRoute: RouteRecordRaw = {
  path: "/login",
  name: "login",
  meta: { title: "登录", icon: "index" },
  component: () => import("@/views/auth/LoginView.vue"),
};

export const NoPermissionRoute: RouteRecordRaw = {
  path: "/no-permission",
  name: "no-permission",
  meta: { title: "没有权限", icon: "index" },
  component: () => import("@/views/errors/NoPermission.vue"),
};

export const ErrorRoute: RouteRecordRaw = {
  path: "/:catchAll(.*)*",
  name: "404",
  meta: {
    title: "404",
  },
  component: () => import("@/views/errors/NotFound.vue"),
};
