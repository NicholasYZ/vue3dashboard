import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: () => import("@/views/layouts/BaseLayout.vue"),
      meta: {
        permissions: ["admin", "editor"],
      },
      children: [
        {
          path: "",
          component: () => import("@/views/index/HomeView.vue"),
          name: "index",
          meta: {
            title: "首页",
            icon: "index",
            permissions: ["admin", "editor"],
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "登录", icon: "index" },
      component: () => import("@/views/auth/LoginView.vue"),
    },
    {
      path: "/no-permission",
      name: "no-permission",
      meta: { title: "没有权限", icon: "index" },
      component: () => import("@/views/errors/NoPermission.vue"),
    },
  ],
});

export default router;
