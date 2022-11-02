<script setup lang="tsx">
import { ref } from "vue";
/**
 * List Config
 */
const config = {
  search: {
    title: "Form 表单",
    inline: true,
    extra: ["reset", "submit"],
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
    formData: ref<any>({}),
  },
  columns: [
    {
      prop: "id",
      filterDisabled: true,
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
      filterDisabled: true
    },
  ],
  view: {
    title: "Form 表单",
    extra: ["reset", "submit"],
    fields: [
      {
        prop: "name",
        name: "name",
        placeholder: "name",
        type: "text",
      },
      {
        prop: "color",
        name: "color",
        placeholder: "color",
        type: "text",
      },
      {
        prop: "pantone_value",
        name: "pantone_value",
        placeholder: "pantone_value",
        type: "text",
      },
      {
        prop: "year",
        name: "year",
        placeholder: "year",
        type: "text",
      },
    ],
    rules: {
      name: [{ required: true }],
      color: [{ required: true }],
      pantone_value: [{ required: true }],
      year: [{ required: true }],
    },
    formData: ref<any>({}),
  },
};
/**
 * Ref child
 * Get methods from child node like onAdd onEdit onDel onView
 */
const child = ref<InstanceType<any> | null>(null);
</script>
<template>
  <vd-list
    ref="child"
    :columns="config.columns"
    :search="config.search"
    :view="config.view"
  >
    <template #operation="{ row }">
      <el-button @click="child.onView(row)" size="small" type="success" round>
        {{ $t("view") }}
      </el-button>
      <el-button @click="child.onEdit(row)" size="small" type="primary" round>
        {{ $t("edit") }}
      </el-button>
      <el-button @click="child.onDel(row)" size="small" type="danger" round>
        {{ $t("del") }}
      </el-button>
    </template>
  </vd-list>
</template>
