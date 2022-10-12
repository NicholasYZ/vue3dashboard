<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
const router = useRoute();
const menu = computed(() => {
  return router.matched.slice(1, 3);
});
</script>
<template>
  <el-breadcrumb class="mb-4" separator="/">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
    <el-breadcrumb-item v-for="item in menu" :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
