<script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "@/utils";
const { data } = useFetch("/users/2");
const config = {
  title: "Form 表单",
  extra: ["submit", "reset"],
  fields: [
    {
      prop: "id",
      name: "用户名",
      placeholder: "name",
      type: "text",
    },
    {
      prop: "email",
      type: "text",
      placeholder: "gender",
    },
    {
      prop: "first_name",
      type: "text",
      placeholder: "first_name",
    },
    {
      prop: "last_name",
      type: "text",
      placeholder: "last_name",
    },
    {
      prop: "avatar",
      type: "text",
      value: "I am an experienced frontend developer.",
      placeholder: "intro",
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
const formData = ref(data);
const onSubmit = async (query: { [key: string]: any }) => {
  try {
    console.log(query);
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
      :formData="formData"
      @submit="onSubmit"
      :config="config"
    ></vd-form>
  </vd-card>
</template>
