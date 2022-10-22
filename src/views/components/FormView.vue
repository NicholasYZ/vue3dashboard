<script setup lang="ts">
import type { FormInstance } from "element-plus";

const config = {
  title: "Form 表单",
  fields: [
    {
      prop: "username",
      name: "用户名",
      placeholder: "username",
      type: "text",
      rules: [{ required: true }],
    },
    {
      prop: "gender",
      type: "radio",
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
      type: "textarea",
      placeholder: "nickname",
      rows: 5,
      rules: [{ required: true }],
    },
  ],
};
const onSubmit = async (
  formEl: FormInstance | undefined,
  form: { [key: string]: any }
) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    console.log("success");
    console.log(form)
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <vd-form
    class="lg:w-1/2"
    :hasSubmit="true"
    @formSubmit="onSubmit"
    :config="config"
  ></vd-form>
</template>
