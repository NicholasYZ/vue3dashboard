<script setup lang="ts">
const props = defineProps([
  "columns",
  "dataSource",
  "loading",
  "title",
  "border",
  "dict",
]);
const emit = defineEmits(["selection-change", "current-change"]);
const onSelectionChange = (val: any) => {
  emit("selection-change", val);
};
const onCurrentChange = (val: any) => {
  emit("current-change", val);
};
</script>

<template>
  <!-- <h2 class="text-xl mb-4 text-slate-600 leading-none">{{ title }}</h2> -->
  <el-table
    v-loading="loading"
    stripe
    :data="dataSource"
    size="large"
    header-row-class-name="text-slate-900 text-center"
    selection
    row-key="id"
    class="mb-6"
    :border="border"
    highlight-current-row
    max-height="700px"
    @selection-change="onSelectionChange"
    @current-change="onCurrentChange"
  >
    <el-table-column
      v-for="item in columns"
      :key="item.prop"
      :prop="item.prop"
      :type="item.type"
      :label="item.label"
      :fixed="item.fixed"
      :width="item.width"
      :formatter="(row: any) => item.formatter ? item.formatter(row, props.dict) : row[item.prop]"
    >
      <template v-if="$slots[item.prop]" #default="scope">
        <slot
          :name="item.prop"
          :row="scope.row"
          :idx="scope.$index"
          :dict="props.dict"
          :item="item"
        ></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
