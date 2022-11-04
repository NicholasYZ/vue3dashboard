<script setup lang="tsx">
import { computed } from "vue";
import { useList } from "@/utils";
const {
  data,
  config,
  isModelVisible,
  reload,
  onDel,
  onAdd,
  onEdit,
  onView,
  onSave,
} = useList({
  url: "/menu",
  search: {
    title: "Form 表单",
    extra: ["submit", "reset"],
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
      formatter: (record: any) => {
        return (
          <el-icon>
            <icon icon={record.icon} />
          </el-icon>
        );
      },
    },
    {
      prop: "icon",
      formatter: (record: any) => {
        return (
          <el-icon>
            <icon icon={record.icon} />
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
    form: {
      id: "",
      name: "",
      path: "",
      permissions: "",
    },
    rules: {
      name: [{ required: true }],
      path: [{ required: true }],
      permissions: [{ required: true }],
    },
  },
});
const dataSource = computed(() => {
  return {
    ...data.value,
    result: data.value.result.map(({ name, path, meta }: any) => {
      const { icon, permissions } = meta;
      return {
        name,
        path,
        permissions,
        icon,
      };
    }),
  };
});
</script>
<template>
  <vd-list
    @reload="reload"
    @add="onAdd"
    :dataSource="dataSource"
    :config="config"
  >
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
  <vd-view v-model="isModelVisible" title="表单">
    <vd-form :config="config.view" @submit="onSave">
      <vd-field
        name="ID"
        prop="id"
        type="text"
        v-model:val="config.view.form.name"
        size="large"
      />
      <vd-field
        name="Email"
        prop="email"
        type="text"
        v-model:val="config.view.form.path"
        size="large"
      />
      <vd-field
        name="First Name"
        prop="first_name"
        type="text"
        v-model:val="config.view.form.permissions"
        size="large"
      />
    </vd-form>
  </vd-view>
</template>
