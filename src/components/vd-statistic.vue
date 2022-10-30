<script setup lang="ts">
defineProps(["title", "num", "color", "icon"]);
</script>
<template>
  <vd-card>
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-base text-slate-400 mb-2">{{ title }}</h3>
        <p class="text-3xl font-semibold text-slate-800">{{ num }}</p>
      </div>
      <el-icon :color="color" :size="60"><Icon :icon="icon" /></el-icon>
    </div>
  </vd-card>
</template>
