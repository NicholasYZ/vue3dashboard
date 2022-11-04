<script setup lang="ts">
import { computed } from "vue";
import { useSettingStore } from "@/store";
defineProps(["isModelVisible", "title"]);
const settingStore = useSettingStore();
const isFullScreen = computed(
  () => settingStore.setting.deviceType === "mobile"
);
</script>
<template>
  <el-dialog
    destroy-on-close
    :fullscreen="isFullScreen"
    :title="$t(title)"
    :value="isModelVisible"
    :style="{
      borderRadius: isFullScreen ? 0 : '10px',
    }"
  >
    <slot></slot>
  </el-dialog>
</template>
