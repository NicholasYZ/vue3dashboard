<script setup lang="ts">
const config = {
  url: "",
  title: "Form 表单",
  fields: [
    {
      prop: "username",
      title: "用户名",
      placeholder: "UserName",
      rules: [{ required: true }],
    },
    {
      prop: "password",
      title: "密码",
      placeholder: "PassWord",
      rules: [{ required: true }],
    },
  ],
};
</script>
<template>
  <vd-form :config="config"></vd-form>
</template>
