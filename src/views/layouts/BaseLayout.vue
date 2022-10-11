<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, computed } from "vue";
import { RouterView } from "vue-router";
import { debounce } from "lodash";

import { useSettingStore } from "@/store";
import BaseSidebar from "@/views/layouts/BaseSidebar.vue";
import BaseHeader from "@/views/layouts/BaseHeader.vue";

const store = useSettingStore();

const handleResize = debounce(() => {
  const type =
    document.body.getBoundingClientRect().width < 768 ? "mobile" : "desktop";
  if (store.setting.deviceType !== "desktop" && type === "desktop") {
    store.setSidebarStatus("open");
  } else if (type === "mobile") {
    store.setSidebarStatus("close");
  }
  store.setDeviceType(type);
}, 200);

onBeforeMount(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const classObj = computed(() => {
  return {
    "vd-fullbar": store.setting.sidebarStatus === "open",
    [`vd-${store.setting.deviceType}`]: true,
  };
});

const isMobileSidebarOpen = computed(() => {
  return (
    store.setting.sidebarStatus === "open" &&
    store.setting.deviceType === "mobile"
  );
});

const onRemoveMask = () => {
  if (isMobileSidebarOpen.value) {
    store.setSidebarStatus("close");
  }
};
</script>

<template>
  <div :class="classObj">
    <BaseSidebar />
    <div class="vd-main transition-all h-screen bg-gray-100">
      <BaseHeader />
      <div class="p-5">
        <RouterView />
      </div>
    </div>
    <div
      v-if="isMobileSidebarOpen"
      @click="onRemoveMask"
      class="backdrop-blur-sm fixed inset-0 w-screen h-screen"
    ></div>
  </div>
</template>
