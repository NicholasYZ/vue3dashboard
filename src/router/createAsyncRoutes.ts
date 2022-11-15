import router from "@/router";

export const addRoutes = (asyncRoutes: any) => {
  const routes = filterAsyncRoutes(asyncRoutes);
  routes.forEach((route: any) => {
    if (!router.hasRoute(route.name)) {
      router.addRoute(route);
    }
  });
};

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
