<script setup lang="tsx">
import { ref } from "vue";
import { useList } from "@/utils";
/**
 * List Config
 */

const { data, reload } = useList("/products");
const vdListNode = ref<InstanceType<any>>({});

const tableConfig = {
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
};
const formConfig = {
  title: "Form 表单",
  form: {
    name: "",
    color: "",
    pantone_value: "",
    year: "",
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
    ref="vdListNode"
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
    <template v-slot:operation="{ row }">
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
            name="Name"
            prop="name"
            type="text"
            v-model:val="form.name"
            size="large"
          />
          <vd-field
            name="Color"
            prop="color"
            type="text"
            v-model:val="form.color"
            size="large"
          />
          <vd-field
            name="Value"
            prop="pantone_value"
            type="text"
            v-model:val="form.pantone_value"
            size="large"
          />
          <vd-field
            name="Year"
            prop="year"
            type="text"
            v-model:val="form.year"
            size="large"
          />
        </vd-form>
      </vd-view>
    </template>
  </vd-list>
</template>
