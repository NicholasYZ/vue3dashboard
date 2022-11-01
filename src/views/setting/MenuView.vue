<script setup lang="tsx">
import { ListKey } from "@/types";
import { provide } from "vue";
import { useList } from "@/utils";
const { data, isModelVisible, formData, methods } = useList("/menu.json");
provide(ListKey, { data, isModelVisible, formData, methods });
const config = {
  list: {
    search: {
      title: "Form 表单",
      extra: [],
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
        prop: "name",
      },
      {
        prop: "path",
      },
      {
        prop: "permissions",
      },
      {
        prop: "icon",
        formatter: (record: any) => {
          return (
            <el-icon>
              <icon icon={record.meta.icon} />
            </el-icon>
          );
        },
      },
      {
        prop: "operation",
        width: 200,
      },
    ],
  },
  view: {
    title: "Form 表单",
    extra: [],
    fields: [
      {
        prop: "name",
        name: "name",
        placeholder: "name",
        type: "text",
        rules: [{ required: true }],
      },
      {
        prop: "color",
        name: "color",
        placeholder: "color",
        type: "text",
        rules: [{ required: true }],
      },
      {
        prop: "pantone_value",
        name: "pantone_value",
        placeholder: "pantone_value",
        type: "text",
        rules: [{ required: true }],
      },
      {
        prop: "year",
        name: "year",
        placeholder: "year",
        type: "text",
        rules: [{ required: true }],
      },
    ],
    rules: {
      name: [{ required: true }],
      color: [{ required: true }],
      pantone_value: [{ required: true }],
      year: [{ required: true }],
    },
  },
};
</script>
<template>
  <vd-list :config="config.list">
    <template #operation="{ row }">
      <el-button @click="methods.view(row)" size="small" type="success" round>
        {{ $t("view") }}
      </el-button>
      <el-button @click="methods.edit(row)" size="small" type="primary" round>
        {{ $t("edit") }}
      </el-button>
      <el-button @click="methods.del(row)" size="small" type="danger" round>
        {{ $t("del") }}
      </el-button>
    </template>
    <template #permissions="scope">
      {{ scope.row.meta.permissions }}
    </template>
    <template #name="scope">
      {{ $t(scope.row.name) }}
    </template>
  </vd-list>
  <vd-view :config="config.view" />
</template>
