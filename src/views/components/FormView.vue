<script setup lang="ts">
import type { FormInstance } from "element-plus";

const config = {
  title: "Form 表单",
  fields: [
    {
      prop: "username",
      name: "用户名",
      placeholder: "username",
      value: "xiaoqing",
      type: "text",
      rules: [{ required: true }],
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
      rules: [{ required: true }],
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
      rules: [{ required: true }],
    },
    {
      prop: "nickname",
      type: "text",
      value: "xiao",
      placeholder: "nickname",
      rows: 5,
      rules: [{ required: true }],
    },
    {
      prop: "intro",
      type: "textarea",
      value: "I am an experienced frontend developer.",
      placeholder: "intro",
      rows: 5,
      rules: [{ required: true }],
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

const onSubmit = async (
  formEl: FormInstance | undefined,
  form: { [key: string]: any }
) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    console.log("success");
    console.log(form);
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <vd-card>
    <h2 class="text-2xl mb-6">{{ config.title }}</h2>
    <vd-form
      class="lg:w-1/2"
      :hasSubmit="true"
      @formSubmit="onSubmit"
      :config="config"
    ></vd-form>
  </vd-card>
</template>
