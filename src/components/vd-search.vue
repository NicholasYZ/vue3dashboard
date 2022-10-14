<script setup lang="ts">
defineProps(["pageInfo"]);
const config = {
  url: "",
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
};
</script>
<template>
  <div class="vd-search">
    <vd-form :config="config" />
  </div>
</template>
