<script setup lang="tsx">
import { ref } from "vue";
const config = {
  url: "/menu",
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
    formData: ref<any>({}),
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
  view: {
    title: "Form 表单",
    extra: ["submit"],
    fields: [
      {
        prop: "name",
        name: "name",
        placeholder: "name",
        type: "text",
        rules: [{ required: true }],
      },
      {
        prop: "path",
        name: "path",
        placeholder: "path",
        type: "text",
        rules: [{ required: true }],
      },
      {
        prop: "permissions",
        name: "permissions",
        placeholder: "permissions",
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
    formData: ref<any>({}),
  },
};
const child = ref<InstanceType<any> | null>(null);
</script>
<template>
  <vd-list
    ref="child"
    :columns="config.columns"
    :search="config.search"
    :view="config.view"
    :url="config.url"
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
    <template #permissions="scope">
      {{ scope.row.meta.permissions }}
    </template>
    <template #name="scope">
      {{ $t(scope.row.name) }}
    </template>
  </vd-list>
  <vd-view :config="config.view" />
</template>
