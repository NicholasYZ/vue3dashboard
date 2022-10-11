import { ref } from "vue";
import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", () => {
  const setting = ref({
    sidebarStatus: "open",
    deviceType: "desktop",
    lang: "zh",
  });

  const setSidebarStatus = (status?: string) => {
    const { sidebarStatus } = setting.value;
    if (status) {
      setting.value.sidebarStatus = status;
    } else {
      setting.value.sidebarStatus = sidebarStatus === "open" ? "close" : "open";
    }
  };

  const setDeviceType = (deviceType: string) => {
    setting.value.deviceType = deviceType;
  };

  return { setting, setSidebarStatus, setDeviceType };
});
