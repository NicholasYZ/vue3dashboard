import type { DirectiveBinding } from "vue";
type FocusableElement = HTMLInputElement | HTMLTextAreaElement;

import { useAuthStore } from "@/store";

export default {
  mounted(el: FocusableElement, binding: DirectiveBinding) {
    const authStore = useAuthStore();
    if (binding.value.indexOf(authStore.userInfo.role) < 0) {
      el.remove();
    }
  },
};
