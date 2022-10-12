<script setup lang="ts">
import { ref } from "vue";
defineProps(["config"]);
const loading = ref<boolean>(false);
const handleCurrentChange = (val: any) => {};
const handleSelectionChange = (val: any) => {};
</script>
<template>
  <el-table
    v-loading="loading"
    stripe
    :data="config.dataSource"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      v-for="item in config.columns"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :formatter="item.formatter"
    >
    </el-table-column>
  </el-table>
  <el-pagination
    layout="prev, pager, next"
    :total="1000"
    @current-change="handleCurrentChange"
  />
</template>
