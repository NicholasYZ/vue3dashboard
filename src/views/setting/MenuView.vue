<script setup lang="ts">
// import { ref } from "vue";

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
  columns: ["id", "name", "color", "pantone_value", "year"],
  url: "/menus",
};
</script>
<template>
  <main>
    <vd-list :config="config"></vd-list>
  </main>
</template>
