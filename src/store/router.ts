import { ref } from "vue";
import { defineStore } from "pinia";
import { getMenu } from "@/api";

interface Menu {
  name: string;
  path: string;
  component: string;
  redirect?: string;
  meta: {
    icon?: string;
    title?: string;
    permissions?: string[];
  };
  children?: Menu[];
}

const routesFilter = (routes: any, permissions: any) => {
  const permissionIds = permissions.map(({ id }: { id: number }) => {
    return id;
  });
  return routes
    .filter((item: any) => {
      const hasPermission = permissionIds.indexOf(item.id) > -1;
      return hasPermission;
    })
    .map((item: any) => {
      if (item.children && item.children.length) {
        item.children = routesFilter(item.children, permissions);
      }
      return item;
    });
};

export const useRouterStore = defineStore("router", () => {
  const routes = ref<Menu[]>([]);
  const isLoaded = ref<boolean>(false);

  const generateRoutes = async (permissions: any[]) => {
    const { result } = await getMenu();
    routes.value = routesFilter(result, permissions);
    isLoaded.value = true;
    return routes.value;
  };

  const reset = () => {
    isLoaded.value = false;
  };

  return { routes, isLoaded, generateRoutes, reset };
});
