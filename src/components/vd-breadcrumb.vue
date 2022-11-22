<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<template>
  <p class="mx-4">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-if="route.path !== '/dashboard'"
        :to="{ path: '/' }"
      >
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item in route.matched"
        :to="{ path: item.path }"
        :key="item.path"
      >
        {{ $t(item.name as string) }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </p>
</template>
