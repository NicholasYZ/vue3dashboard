<script setup lang="tsx">
import { ListKey } from "@/types";
import { provide, ref } from "vue";
import { useList } from "@/utils";
const { data, methods } = useList("/users");
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
};
provide(ListKey, { data, config, methods });
const isAddFormVisable = ref<boolean>(false);
const form = {
  title: "Form 表单",
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
    username: [{ required: true }],
    gender: [{ required: true }],
    city: [{ required: true }],
    nickname: [{ required: true }],
    intro: [{ required: true }],
  },
};

const onShow = () => {
  isAddFormVisable.value = true;
};
</script>
<template>
  <vd-list @add="onShow" :config="config">
    <template #avatar="{ row }">
      <img
        class="w-10 h-10 rounded-full"
        :src="row.avatar"
        alt="Default avatar"
      />
    </template>
    <template v-slot:operation="{ row }">
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
  </vd-list>
  <vd-view :config="form" v-model="isAddFormVisable"></vd-view>
</template>
