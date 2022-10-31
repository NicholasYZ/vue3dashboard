<script setup lang="tsx">
import { ListKey } from "@/types";
import { provide } from "vue";
import { useList } from "@/utils";
const { data, onAdd, onView, onEdit, onDel } = useList("/products");
const config = {
  search: {
    title: "Form 表单",
    inline: true,
    fields: [
      {
        prop: "username",
        placeholder: "UserName",
      },
      {
        prop: "city",
        placeholder: "city",
        type: "select",
        dict: {
          "1": "beijing",
          "2": "shanghai",
          "3": "guangzhou",
        },
      },
    ],
  },
  columns: [
    {
      prop: "id",
    },
    {
      prop: "name",
    },
    {
      prop: "color",
    },
    {
      prop: "pantone_value",
    },
    {
      prop: "year",
      formatter: (record: any) => {
        return <el-tag>{record["year"]}</el-tag>;
      },
    },
    {
      prop: "operation",
      width: 200,
    },
  ],
};
provide(ListKey, { data, config, onAdd, onView, onEdit, onDel });

// form: {
//     title: "Form 表单",
//     fields: [
//       {
//         prop: "name",
//         name: "name",
//         placeholder: "name",
//         type: "text",
//         rules: [{ required: true }],
//       },
//       {
//         prop: "color",
//         name: "color",
//         placeholder: "color",
//         type: "text",
//         rules: [{ required: true }],
//       },
//       {
//         prop: "pantone_value",
//         name: "pantone_value",
//         placeholder: "pantone_value",
//         type: "text",
//         rules: [{ required: true }],
//       },
//       {
//         prop: "year",
//         name: "year",
//         placeholder: "year",
//         type: "text",
//         rules: [{ required: true }],
//       },
//     ],
//   },
</script>
<template>
  <vd-list :config="config">
    <template v-slot:operation="{ row }">
      <el-button @click="onView(row)" size="small" type="success" round>
        {{ $t("view") }}
      </el-button>
      <el-button @click="onEdit(row)" size="small" type="primary" round>
        {{ $t("edit") }}
      </el-button>
      <el-button @click="onDel(row)" size="small" type="danger" round>
        {{ $t("del") }}
      </el-button>
    </template>
  </vd-list>
</template>
