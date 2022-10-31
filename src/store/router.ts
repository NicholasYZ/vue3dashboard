import { ref } from "vue";
import { defineStore } from "pinia";
import { getMenu } from "@/api";

interface Menu {
  name?: string;
  path: string;
  component: string;
  redirect?: string;
  children?: Menu[];
  meta: {
    icon?: string;
    title?: string;
    permissions?: string[];
  };
}
export const useRouterStore = defineStore("router", () => {
  const router = ref<Menu[]>([]);
  const getRouter = async () => {
    const res = await getMenu();
    router.value = res;
  };
  return { router, getRouter };
});
