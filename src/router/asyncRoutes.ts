import { useRouterStore } from "@/store";

export const getAsyncRoutes = async (permissions: any) => {
  const store = useRouterStore();
  await store.getRoutes(permissions);
  return store.routes;
};
