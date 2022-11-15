<template>
  <el-scrollbar class="transition-all" :class="{ 'p-2': isSidebarOpened }">
    <el-menu
      text-color="#f8fafc"
      active-text-color="#fbbf24"
      background-color="bg-slate-900"
      :default-active="active"
      :collapse-transition="false"
      :collapse="sidebarStatus === 'close'"
      router
      unique-opened
      style="--el-menu-hover-bg-color: #1e293b"
    >
      <slot></slot>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps(["active", "sidebarStatus"]);
const isSidebarOpened = computed(() => {
  return props.sidebarStatus === "open";
});
</script>
