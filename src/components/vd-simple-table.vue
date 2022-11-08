<script setup lang="ts">
defineProps(["columns", "data", "title"]);
</script>
<template>
  <vd-card>
    <h2 class="text-xl mb-4 text-slate-600 leading-none">{{ title }}</h2>
    <el-table
      v-loading="data.loading"
      stripe
      :data="data.result"
      size="large"
      :border="true"
      header-row-class-name="text-slate-900 capitalize text-center"
    >
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :prop="item.prop"
        :label="$t(`tableTitle.${item.prop}`)"
        :width="item.width"
      >
        <template v-if="$slots[item.prop]" #default="scope">
          <slot :name="item.prop" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </vd-card>
</template>
