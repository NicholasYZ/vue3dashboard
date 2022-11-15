<script setup lang="ts">
defineProps(["icon"]);
</script>
<template>
  <div
    class="cursor-pointer rounded-md mx-1 w-8 h-8 bg-slate-50 text-slate-500 hover:text-slate-900 flex items-center justify-center"
  >
    <el-icon size="20">
      <vd-icon :icon="icon" />
    </el-icon>
  </div>
</template>
