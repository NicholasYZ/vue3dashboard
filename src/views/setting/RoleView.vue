<script setup lang="ts">
const config = {
  search: {
    title: "Form 表单",
    inline: true,
    fields: [
      {
        prop: "username",
        name: "用户名",
        placeholder: "UserName",
      },
      {
        prop: "password",
        name: "密码",
        placeholder: "PassWord",
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
  ],
  url: "/roles",
};
</script>
<template>
  <main>
    <vd-list :config="config"></vd-list>
  </main>
</template>
