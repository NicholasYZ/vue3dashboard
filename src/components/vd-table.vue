<script setup lang="ts">
defineProps(["columns", "dataSource", "loading"]);
</script>
<template>
  <el-table
    v-loading="loading"
    stripe
    :data="dataSource"
    :border="true"
    size="large"
    selection
  >
    <el-table-column type="selection" width="55" />
    <el-table-column
      v-for="item in columns"
      :key="item"
      :prop="item"
      :label="item"
    />
  </el-table>
</template>
