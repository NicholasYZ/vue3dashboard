<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
defineProps(["pageInfo"]);
const route = useRoute();
const router = useRouter();
const onChange = (page: number) => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      page,
    },
  });
};
</script>
<template>
  <div class="flex items-center justify-end">
    <el-pagination
      layout="prev, pager, next"
      :current-page="pageInfo.page"
      :total="pageInfo.total"
      background
      @current-change="onChange"
    />
  </div>
</template>
