import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { debounce } from "lodash";
import { useSettingStore } from "@/store";
import { getDevice } from "@/utils";

const store = useSettingStore();

export function useDevice() {
  const resizeWindow = debounce(() => {
    const deviceType: string = getDevice();
    if (store.setting.deviceType !== "desktop" && deviceType === "desktop") {
      store.setSidebarStatus("open");
    } else if (deviceType === "mobile") {
      store.setSidebarStatus("close");
    }
    store.setDeviceType(deviceType);
  }, 100);

  onMounted(() => {
    resizeWindow();
  });

  onBeforeMount(() => {
    window.addEventListener("resize", resizeWindow);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeWindow);
  });
}
