import { useRouterStore } from "@/store";

export const getAsyncRoutes = async (permissions: any) => {
  const routerStore = useRouterStore();
  await routerStore.getRoutes(permissions);
  console.log(routerStore.routes)
  return routerStore.routes;
};
