<script setup lang="ts">
import { computed } from "vue";

import { useSettingStore } from "@/store";
import { useDevice } from "@/hooks";

import Sidebar from "@/views/layouts/BaseSidebar.vue";
import Header from "@/views/layouts/BaseHeader.vue";
import Content from "@/views/layouts/BaseContent.vue";

const store = useSettingStore();

useDevice();

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
    <Sidebar />
    <div class="vd-main transition-all bg-gray-100">
      <Header />
      <Content />
    </div>
  </div>
  <div
    v-if="isMobileSidebarOpen"
    @click="onRemoveMask"
    class="backdrop-blur-sm z-[1000] fixed inset-0 w-screen h-screen"
  ></div>
</template>
