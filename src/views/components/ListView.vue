<script setup lang="tsx">
import { reactive } from "vue";
import { useList } from "@/utils";
/**
 * List Config
 */
const {
  data,
  config,
  isModelVisible,
  reload,
  onDel,
  onAdd,
  onEdit,
  onView,
  onSave
} = useList({
  url: "/products",
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
      filterDisabled: true,
    },
  ],
  view: {
    title: "Form 表单",
    form: reactive({
      name: "",
      color: "",
      pantone_value: "",
      year: "",
    }),
    rules: {
      name: [{ required: true }],
      color: [{ required: true }],
      pantone_value: [{ required: true }],
      year: [{ required: true }],
    },
  },
});
</script>
<template>
  <vd-list @reload="reload" @add="onAdd" :dataSource="data" :config="config">
    <template #operation="{ row }">
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
  <vd-view v-model="isModelVisible" title="表单">
    <vd-form :config="config.view" @submit="onSave">
      <vd-field
        name="Name"
        prop="name"
        type="text"
        v-model:val="config.view.form.name"
        size="large"
      />
      <vd-field
        name="Color"
        prop="color"
        type="text"
        v-model:val="config.view.form.color"
        size="large"
      />
      <vd-field
        name="Value"
        prop="pantone_value"
        type="text"
        v-model:val="config.view.form.pantone_value"
        size="large"
      />
      <vd-field
        name="Year"
        prop="year"
        type="text"
        v-model:val="config.view.form.year"
        size="large"
      />
    </vd-form>
  </vd-view>
</template>
