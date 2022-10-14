import { ref } from "vue";
import { defineStore } from "pinia";
import { deviceDetector } from "@/utils/deviceDetector";

type SettingProps = {
  [key: string]: string;
};

export const useSettingStore = defineStore("setting", () => {
  const deviceType = deviceDetector();
  const initalData: SettingProps = {
    sidebarStatus: "open",
    deviceType,
    language: "zh",
  };
  const setting = ref<SettingProps>(initalData);

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
