<script setup lang="ts">
import { ref } from "vue";
const config = {
  title: "Form 表单",
  extra: ["submit"],
  fields: [
    {
      prop: "username",
      name: "用户名",
      placeholder: "username",
      value: "xiaoqing",
      type: "text",
    },
    {
      prop: "gender",
      type: "radio",
      value: "1",
      dict: {
        "1": "male",
        "2": "female",
      },
      placeholder: "gender",
    },
    {
      prop: "city",
      type: "select",
      value: "1",
      dict: {
        "1": "beijing",
        "2": "shanghai",
        "3": "guangzhou",
      },
      placeholder: "city",
    },
    {
      prop: "nickname",
      type: "text",
      value: "xiao",
      placeholder: "nickname",
      rows: 5,
    },
    {
      prop: "intro",
      type: "textarea",
      value: "I am an experienced frontend developer.",
      placeholder: "intro",
      rows: 5,
    },
  ],
  rules: {
    username: [{ required: true }],
    gender: [{ required: true }],
    city: [{ required: true }],
    nickname: [{ required: true }],
    intro: [{ required: true }],
  },
};
const formData = ref({});
const onSubmit = async (query: { [key: string]: any }) => {
  try {
    console.log("success");
    console.log(query);
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <vd-card>
    <h2 class="text-2xl mb-6">{{ config.title }}</h2>
    <vd-form class="lg:w-1/2" @submit="onSubmit" :formData="formData" :config="config"></vd-form>
  </vd-card>
</template>
