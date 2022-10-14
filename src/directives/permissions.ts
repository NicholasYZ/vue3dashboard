import type { DirectiveBinding } from "vue";
type CurElement = HTMLInputElement | HTMLTextAreaElement;

import { useAuthStore } from "@/store";

export default {
  mounted(el: CurElement, binding: DirectiveBinding) {
    const authStore = useAuthStore();
    if (binding.value.indexOf(authStore.userInfo.role) < 0) {
      el.remove();
    }
  },
};
