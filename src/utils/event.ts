// event.js
import { onMounted, onUnmounted } from "vue";

export function useEventListener(target: { addEventListener: (arg0: any, arg1: any) => any; removeEventListener: (arg0: any, arg1: any) => any; }, event: any, callback: any) {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}
