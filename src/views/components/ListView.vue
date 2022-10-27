<script setup lang="tsx">
import { I18NextVue, i18next } from "@/i18n";
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
    },
    {
      prop: "operation",
      formatter: (record: any, emit: any) => {
        return (
          <el-button
            onClick={() => {
              emit("edit", record);
            }}
            type="primary"
            link
          >
            {i18next.t("edit")}
          </el-button>
        );
      },
    },
  ],
  form: {
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
  },
};
</script>
<template>
  <main>
    <vd-list :config="config"></vd-list>
  </main>
</template>
