<script setup lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";

import { useSettingStore } from "@/store";
import { useDevice } from "@/utils";
import BaseSidebar from "@/views/layouts/BaseSidebar.vue";
import BaseHeader from "@/views/layouts/BaseHeader.vue";

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
    <BaseSidebar />
    <div class="vd-main transition-all bg-gray-100">
      <BaseHeader />
      <div class="p-5">
        <vd-breadcrumb />
        <RouterView />
      </div>
    </div>
    <div
      v-if="isMobileSidebarOpen"
      @click="onRemoveMask"
      class="backdrop-blur-sm z-[2001] fixed inset-0 w-screen h-screen"
    ></div>
  </div>
</template>
