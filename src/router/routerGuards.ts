import { ref } from "vue";
import NProgress from "nprogress";
import type { Router } from "vue-router";
import {
  useUserStore,
  useRouterStore,
  useSettingStore,
  useTags,
} from "@/store";
import { ErrorRoute } from "./constantRoutes";
import { storage } from "@/utils";
import "nprogress/nprogress.css";

const whiteList: string[] = ["/login"];

NProgress.configure({ showSpinner: false });

const modules = import.meta.glob("../views/**/*.vue");

const generateRoutes = (routes: any): Array<any> => {
  return routes.map((route: any) => {
    if (route.redirect) {
      if (route.redirect.indexOf("/") < 0) {
        route.redirect = { name: route.redirect };
      }
    }
    if (route.component) {
      try {
        route.component = modules["../views/" + route.component + ".vue"];
      } catch (e) {
        console.log(e);
      }
    }
    if (route?.children?.length) {
      route.children = generateRoutes(route.children);
    }
    return route;
  });
};

export const setupRouterGuards = (router: Router) => {
  const isLoaded = ref<boolean>(false);

  router.beforeEach(async (to) => {
    const { getUserInfo } = useUserStore();
    const { loadRoutes } = useRouterStore();
    const token = storage.getItem("token");

    NProgress.start();

    if (whiteList.indexOf(to.path) !== -1) {
      return true;
    }

    if (!token) {
      router.push("/login");
      return true;
    }

    if (isLoaded.value) {
      return true;
    }

    const userInfo = await getUserInfo();
    const asyncRoutes = await loadRoutes(userInfo.roles);
    const routes = generateRoutes(asyncRoutes);

    routes.forEach((route: any) => {
      if (!router.hasRoute(route.name)) {
        router.addRoute(route);
      }
    });

    if (!router.hasRoute("404")) {
      router.addRoute(ErrorRoute);
    }

    isLoaded.value = true;

    return to.fullPath;
  });

  router.afterEach((to) => {
    const settingStore = useSettingStore();
    const { setTags } = useTags();
    const { name, path } = to;
    if (settingStore.setting.deviceType === "mobile") {
      settingStore.setSidebarStatus("close");
    }
    document.title = `${to.meta.title} - VD`;
    setTags({
      name: name as string,
      path,
    });
    NProgress.done();
    window.scrollTo(0, 0);
  });
};
