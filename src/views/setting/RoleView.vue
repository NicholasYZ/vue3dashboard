<script setup lang="tsx">
import { ref } from "vue";
const config = {
  url: "/roles.json",
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
    <template #avatar="{ row }">
      <img
        class="w-10 h-10 rounded-full"
        :src="row.avatar"
        alt="Default avatar"
      />
    </template>
    <template v-slot:operation="{ row }">
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
  </vd-list>
</template>
