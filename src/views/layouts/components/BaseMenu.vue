<template>
  <el-scrollbar class="transition-all" :class="{ 'p-2': sidebarStatus }">
    <el-menu
      text-color="#f8fafc"
      active-text-color="#fbbf24"
      background-color="bg-slate-900"
      :default-active="active"
      :collapse-transition="false"
      :collapse="!sidebarStatus"
      router
      unique-opened
      style="--el-menu-hover-bg-color: #1e293b"
    >
      <slot></slot>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
defineProps(["active", "sidebarStatus"]);
</script>
