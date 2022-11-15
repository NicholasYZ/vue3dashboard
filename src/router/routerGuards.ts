import NProgress from "nprogress";
import type { Router } from "vue-router";
import { addRoutes } from "@/router/createAsyncRoutes";
import { useUserStore, useRouterStore, useSettingStore } from "@/store";
import "nprogress/nprogress.css";

const whiteList: string[] = ["/login"];

NProgress.configure({
  showSpinner: false,
});

export const setupRouterGuards = (router: Router) => {
  router.beforeEach(async (to) => {
    const userStore = useUserStore();
    const routerStore = useRouterStore();

    NProgress.start();

    if (whiteList.indexOf(to.path) !== -1) {
      return true;
    }

    if (!userStore.userInfo.token) {
      router.push("/login");
      return true;
    }

    if (routerStore.isLoaded) {
      return true;
    }

    await routerStore.getRoutes(userStore.userInfo.permissions);
    addRoutes(routerStore.routes);
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
