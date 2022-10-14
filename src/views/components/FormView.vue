<script setup lang="ts">
const config = {
  url: "",
  title: "Form 表单",
  fields: [
    {
      prop: "username",
      name: "用户名",
      placeholder: "UserName",
      rules: [{ required: true }],
    },
    {
      prop: "password",
      name: "密码",
      placeholder: "PassWord",
      rules: [{ required: true }],
    },
    {
      prop: "newpassword",
      name: "新密码",
      placeholder: "NewPassWord",
      rules: [{ required: true }],
    },
  ],
};
</script>
<template>
  <vd-form :config="config"></vd-form>
</template>
