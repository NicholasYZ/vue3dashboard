import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import { debounce } from "lodash";

export function useDevice() {
  const deviceType = ref<string>("desktop");

  const resizeWindow = debounce(() => {
    deviceType.value = getDevice();
    console.log(deviceType.value);
  }, 100);

  const getDevice = (): string => {
    return document.body.getBoundingClientRect().width < 768
      ? "mobile"
      : "desktop";
  };

  onMounted(() => {
    resizeWindow();
  });

  onBeforeMount(() => {
    window.addEventListener("resize", resizeWindow);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeWindow);
  });

  return { deviceType, getDevice };
}
