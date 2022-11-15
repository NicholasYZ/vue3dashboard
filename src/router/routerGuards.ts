import NProgress from "nprogress";
import type { Router } from "vue-router";
import { useRouterStore, useSettingStore } from "@/store";
import { storage } from "@/utils";
import { getAsyncRoutes } from "./asyncRoutes";
import "nprogress/nprogress.css";

const whiteList: string[] = ["/login"];

NProgress.configure({
  showSpinner: false,
});

const _modules = import.meta.glob("../views/**/*.vue");

const filterAsyncRoutes = (routes: any) => {
  const asyncRoutes: Array<any> = [];
  routes.forEach((route: any) => {
    if (route.redirect) {
      if (route.redirect.indexOf("/") < 0) {
        route.redirect = { name: route.redirect };
      }
    }
    if (route.component) {
      try {
        route.component = _modules["../views/" + route.component + ".vue"];
      } catch (e) {
        console.log(e);
      }
    }
    if (route?.children?.length) {
      route.children = filterAsyncRoutes(route.children);
    }
    asyncRoutes.push(route);
  });
  return asyncRoutes;
};

export const setupRouterGuards = (router: Router) => {
  router.beforeEach(async (to) => {
    const userData = storage.getItem("userData");
    const routerStore = useRouterStore();

    NProgress.start();

    if (whiteList.indexOf(to.path) !== -1) {
      return true;
    }

    if (!userData.token) {
      router.push("/login");
      return true;
    }

    if (routerStore.isLoaded) {
      return true;
    }

    const asyncRoutes = await getAsyncRoutes(userData.permissions);
    const routes = filterAsyncRoutes(asyncRoutes);

    routes.forEach((route: any) => {
      if (!router.hasRoute(route.name)) {
        router.addRoute(route);
      }
    });

    return to.fullPath;
  });

  router.afterEach((to) => {
    const store = useSettingStore();
    if (store.setting.deviceType === "mobile") {
      store.setSidebarStatus("close");
    }
    document.title = `${to.meta.title} - VD`;
    NProgress.done();
  });
};
