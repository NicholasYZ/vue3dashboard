<script setup lang="ts">
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
  url: "/roles",
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
      prop: "id",
    },
    {
      prop: "type",
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
      type: "",
    },
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
    <template #avatar="{ row }">
      <img
        class="w-10 h-10 rounded-full"
        :src="row.avatar"
        alt="Default avatar"
      />
    </template>
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
        name="ID"
        prop="id"
        type="text"
        v-model:val="config.view.form.id"
        size="large"
      />
      <vd-field
        name="Type"
        prop="type"
        type="text"
        v-model:val="config.view.form.type"
        size="large"
      />
    </vd-form>
  </vd-view>
</template>
