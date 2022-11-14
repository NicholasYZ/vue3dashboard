import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";
import { setupRouterGuards } from "./routerGuards";
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

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

setupRouterGuards(router);

export default router;
