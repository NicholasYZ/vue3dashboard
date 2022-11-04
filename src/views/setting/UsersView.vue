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
  onSave,
} = useList({
  url: "/users",
  search: {
    title: "Form 表单",
    inline: true,
    fields: [
      {
        name: "UserName",
        prop: "username",
        placeholder: "UserName",
      },
      {
        name: "City",
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
      prop: "email",
    },
    {
      prop: "first_name",
    },
    {
      prop: "last_name",
    },
    {
      prop: "avatar",
    },
    {
      prop: "operation",
      width: 200,
    },
  ],
  view: {
    form: reactive({
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      avatar: "https://reqres.in/img/faces/5-image.jpg",
    }),
    rules: {
      id: [{ required: true }],
      email: [{ required: true }],
      first_name: [{ required: true }],
      last_name: [{ required: true }],
      avatar: [{ required: true }],
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
        v-model:val="config.view.form.id"
        size="large"
      />
      <vd-field
        name="Email"
        prop="email"
        type="text"
        v-model:val="config.view.form.email"
        size="large"
      />
      <vd-field
        name="First Name"
        prop="first_name"
        type="text"
        v-model:val="config.view.form.first_name"
        size="large"
      />
      <vd-field
        name="Avatar"
        prop="avatar"
        type="text"
        v-model:val="config.view.form.avatar"
        size="large"
      >
        <img :src="config.view.form.avatar" class="w-20 h-20 rounded" />
      </vd-field>
    </vd-form>
  </vd-view>
</template>
