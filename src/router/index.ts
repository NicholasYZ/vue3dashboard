import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import {
  IndexRoute,
  LoginRoute,
  NoPermissionRoute,
  ErrorRoute,
} from "./constantRoutes";

const routes: RouteRecordRaw[] = [
  IndexRoute,
  LoginRoute,
  NoPermissionRoute,
  ErrorRoute,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
