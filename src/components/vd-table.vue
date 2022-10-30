<script setup lang="ts">
defineProps(["columns", "dataSource", "loading"]);
const emit = defineEmits(["add", "edit", "view", "del", "switch"]);
</script>
<template>
  <el-table
    v-loading="loading"
    stripe
    :data="dataSource"
    size="large"
    header-row-class-name="text-slate-900 capitalize text-center"
    selection
  >
    <el-table-column type="selection" width="55" />
    <el-table-column
      v-for="item in columns"
      :key="item.prop"
      :prop="item.prop"
      :label="$t(`tableTitle.${item.prop}`)"
      :width="item.width"
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
