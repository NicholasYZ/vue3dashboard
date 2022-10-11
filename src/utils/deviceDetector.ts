import { ref, onBeforeMount, onBeforeUnmount } from "vue";
import { debounce } from "lodash";

export function useDeviceDetector() {
  const type = ref<string>("desktop");
  const handleResize = debounce(() => {
    type.value =
      document.body.getBoundingClientRect().width < 768 ? "mobile" : "desktop";
  }, 200);

  onBeforeMount(() => {
    window.addEventListener("resize", handleResize);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });
  return { type };
}
