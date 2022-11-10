import type { DirectiveBinding } from "vue";
type CurElement = HTMLInputElement | HTMLTextAreaElement;

import { useUserStore } from "@/store";

export default {
  mounted(el: CurElement, binding: DirectiveBinding) {
    const authStore = useUserStore();
    if (binding.value.indexOf(authStore.userInfo.role) < 0) {
      el.remove();
    }
  },
};
