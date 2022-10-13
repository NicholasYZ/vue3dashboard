<script setup lang="ts">
defineProps(["pageInfo"]);
const emit = defineEmits(["onPageChange"]);
const handleCurrentPageChange = (num: number) => {
  emit("onPageChange", num);
};
</script>
<template>
  <div class="flex items-center justify-end">
    <el-pagination
      layout="prev, pager, next"
      :current-page="pageInfo.page"
      :total="pageInfo.total"
      background
      @current-change="handleCurrentPageChange"
    />
  </div>
</template>
