<script setup lang="ts">
import { inject } from "vue";
const props = defineProps(["columns", "dataSource", "loading"]);
const emit = defineEmits(["create", "edit"]);
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
      :key="item.prop"
      :prop="item.prop"
      :label="item.prop"
      :formatter="(record: any) => {
        if (item.formatter) {
          return item.formatter(record, emit)
        } else {
          return record[item.prop]
        }
      }"
    />
  </el-table>
</template>
