<script setup lang="tsx">
import { ref } from "vue";
import { computed } from "vue";
import { useList } from "@/utils";
const { data, reload } = useList("/menu");
const vdListNode = ref<InstanceType<any>>({});
const tableConfig = {
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
};
const formConfig = {
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
};
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
    ref="vdListNode"
    @reload="reload"
    :dataSource="dataSource"
    :formConfig="formConfig"
    :tableConfig="tableConfig"
  >
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
            name="ID"
            prop="name"
            type="text"
            v-model:val="form.name"
            size="large"
          />
          <vd-field
            name="Path"
            prop="path"
            type="text"
            v-model:val="form.path"
            size="large"
          />
          <vd-field
            name="Permissions"
            prop="permissions"
            type="text"
            v-model:val="form.permissions"
            size="large"
          />
        </vd-form>
      </vd-view>
    </template>
  </vd-list>
</template>
