<script setup lang="ts">
defineProps(["columns", "dataSource", "loading"]);
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
          return item.formatter(record)
        } else {
          return record[item.prop]
        }
      }"
    >
      <template v-if="$slots[item.prop]" #default="scope">
        <slot :name="item.prop" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<!-- :formatter="(record: any) => {
        if (item.formatter) {
          return item.formatter(record, emit)
        } else {
          return record[item.prop]
        }
      }" -->

<!-- 
<template v-for="(index, name) in $slots" v-slot:[name]>
<slot :name="name"></slot>
</template> 
-->
<!-- 
<template v-if="$slots[item.prop]" #default>
<slot :name="item.prop"></slot>
</template> 
-->
