<script setup lang="ts">
import { ref } from "vue";
import { useList } from "@/utils";
const { data, reload } = useList("/roles");
const vdListNode = ref<InstanceType<any>>({});
const tableConfig = {
  url: "/roles",
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
      prop: "type",
    },
    {
      prop: "operation",
      width: 200,
    },
  ],
};
const formConfig = {
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
};
</script>
<template>
  <vd-list
    @reload="reload"
    :dataSource="data"
    :formConfig="formConfig"
    :tableConfig="tableConfig"
  >
    <template #avatar="{ row }">
      <img
        class="w-10 h-10 rounded-full"
        :src="row.avatar"
        alt="Default avatar"
      />
    </template>
    <template #operation="{ row }">
      <el-button
        @click="vdListNode.onView(row)"
        size="small"
        type="success"
        round
      >
        {{ $t("view") }}
      </el-button>
      <el-button
        @click="vdListNode.onEdit(row)"
        size="small"
        type="primary"
        round
      >
        {{ $t("edit") }}
      </el-button>
      <el-button
        @click="vdListNode.onDel(row)"
        size="small"
        type="danger"
        round
      >
        {{ $t("del") }}
      </el-button>
    </template>
    <template #view="{ form, rules }">
      <vd-view v-model="vdListNode.isModelVisible" title="表单">
        <vd-form :form="form" :rules="rules" @submit="vdListNode.onSave">
          <vd-field
            name="ID"
            prop="id"
            type="text"
            v-model:val="form.form.id"
            size="large"
          />
          <vd-field
            name="Type"
            prop="type"
            type="text"
            v-model:val="form.form.type"
            size="large"
          />
        </vd-form>
      </vd-view>
    </template>
  </vd-list>
</template>
