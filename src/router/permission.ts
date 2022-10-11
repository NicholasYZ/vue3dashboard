import NProgress from "nprogress";
import router from "@/router";
import { addRoutes } from "@/router/resolveRouter";
import { useAuthStore, useRouterStore } from "@/store";

import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
});

const whiteList: string[] = ["/login", "/no-permission"];

router.beforeEach(async (to) => {
  const store = useRouterStore();
  const authStore = useAuthStore();

  NProgress.start();

  if (whiteList.indexOf(to.path) !== -1) {
    return true;
  } else if (authStore.userInfo.token === "login:ok") {
    if (store.router.length === 0) {
      await store.getRouter();
      addRoutes(store.router);
      return to.fullPath;
    } else {
      if (
        to.meta.permissions &&
        to.meta.permissions.indexOf(authStore.userInfo.role as string) < 0
      ) {
        router.push("/no-permission");
      } else {
        return true;
      }
    }
  } else {
    router.push("/login");
  }
});

router.afterEach((to) => {
  NProgress.done();
  document.title = `${to.meta.title}`;
});
