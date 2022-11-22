import type { RouteRecordRaw } from "vue-router";

export const IndexRoute: RouteRecordRaw = {
  path: "/",
  name: "home",
  component: () => import("@/views/layouts/BaseLayout.vue"),
  redirect: "/dashboard",
  children: [
    {
      path: "/dashboard",
      component: () => import("@/views/index/HomeView.vue"),
      name: "dashboard",
      meta: {
        title: "控制台",
        icon: "index",
      },
    },
  ],
};

export const LoginRoute: RouteRecordRaw = {
  path: "/login",
  name: "login",
  meta: {
    title: "登录",
    icon: "index",
  },
  component: () => import("@/views/auth/LoginView.vue"),
};

export const ErrorRoute: RouteRecordRaw = {
  path: "/:catchAll(.*)*",
  name: "404",
  meta: {
    title: "404",
  },
  component: () => import("@/views/errors/NotFound.vue"),
};
