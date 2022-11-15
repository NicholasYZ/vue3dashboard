import type { RouteRecordRaw } from "vue-router";

export const ProductsRoute: RouteRecordRaw = {
  path: "/index",
  component: () => import("@/views/index/HomeView.vue"),
  name: "home",
  meta: {
    title: "首页",
    icon: "index",
    permissions: ["admin", "editor"],
  },
};
