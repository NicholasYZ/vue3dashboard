import { ref } from "vue";
import { useUserStore } from "@/store";

import type { DirectiveBinding } from "vue";
type CurElement = HTMLInputElement | HTMLTextAreaElement;

export default {
  mounted(el: CurElement, binding: DirectiveBinding) {
    const hasPermission = ref<boolean>(false);
    const store = useUserStore();
    store.userInfo.roles.forEach((i: string) => {
      if (binding.value.indexOf(i) > -1) {
        hasPermission.value = true;
      }
    });
    if (!hasPermission.value) {
      el.remove();
    }
  },
};
