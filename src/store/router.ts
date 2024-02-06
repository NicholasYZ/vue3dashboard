import { ref } from "vue";
import { defineStore } from "pinia";
import { get } from "@/utils";

const hasPermission = (route: any, roles: any[]) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
};

const filter = (routes: any, roles: any) => {
  return routes
    .filter((route: any) => {
      return hasPermission(route, roles);
    })
    .map((route: any) => {
      if (route.children && route.children.length) {
        route.children = filter(route.children, roles);
      }
      return route;
    });
};

export const useRouterStore = defineStore("router", () => {
  const routes = ref<any[]>([]);
  const loadRoutes = async (roles: any[]) => {
    const { result } = await get("/routes");
    routes.value = filter(result, roles);
    return routes.value;
  };

  return { routes, loadRoutes };
});
