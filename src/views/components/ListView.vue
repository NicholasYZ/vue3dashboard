<template>
  <!-- <vd-list-bar>
    <template #list-bar-left>
      <vd-search :config="config.search" />
    </template>
    <template #list-bar-right>
      <div class="flex md:justify-end justify-center items-center mb-4">
        <vd-icon-box icon="Download" @click="handleExport" />
      </div>
    </template>
  </vd-list-bar>
  <vd-card v-loading="data.loading">
    <el-table
      stripe
      size="large"
      header-row-class-name="text-slate-900 capitalize text-center"
      selection
      row-key="name"
      :data="data.result"
      class="mb-6"
    >
      <el-table-column prop="id" :label="$t('tableTitle.id')" />
      <el-table-column prop="color" :label="$t('tableTitle.color')" />
      <el-table-column prop="name" :label="$t('tableTitle.name')" />
      <el-table-column
        prop="pantone_value"
        :label="$t('tableTitle.pantone_value')"
      />
      <el-table-column prop="year" :label="$t('tableTitle.year')" />
    </el-table>
    <vd-pagination :pageInfo="data.pageInfo" />
  </vd-card> -->
  <vd-list title="列表" v-bind="config" url="/products" />
</template>

<script setup lang="ts">
const config = {
  search: [
    {
      prop: "id",
      placeholder: "订单ID",
      label: "订单ID",
      type: "text",
    },
  ],
  columns: [
    {
      prop: "id",
      label: "订单ID",
    },
    {
      prop: "name",
      label: "商品名称",
    },
  ],
};
// import { useList, useExport } from "@/hooks";
// const { data } = useList("/products");
// const { onExport } = useExport();
// const config = {
//   search: [
//     {
//       prop: "username",
//       placeholder: "UserName",
//       type: "text",
//     },
//     {
//       prop: "city",
//       placeholder: "city",
//       type: "select",
//       dict: { "1": "beijing", "2": "shanghai", "3": "guangzhou" },
//     },
//   ],
// };
// const handleExport = () => {
//   onExport(data.value.result, "title");
// };
</script>
