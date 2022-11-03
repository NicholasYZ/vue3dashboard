<script setup lang="ts">
import { ref } from "vue";
import { useFetch, sleep } from "@/utils";
import { ElMessage } from "element-plus";

const { data } = useFetch("/users/1");

console.log(data)

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
    id: [{ required: true }],
    name: [{ required: true }],
    email: [{ required: true }],
    first_name: [{ required: true }],
    last_name: [{ required: true }],
    avatar: [{ required: true }],
  },
  formData: ref<any>(data),
};

const loading = ref<boolean>(false);

const onSubmit = async (query: { [key: string]: any }) => {
  try {
    console.log(query);
    ElMessage({
      message: "Congrats, this is a success message.",
      type: "success",
    });
    loading.value = true;
    await sleep(500);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const onReset = () => {

}
</script>
<template>
  <vd-card v-loading="loading">
    <h2 class="text-2xl mb-6">{{ config.title }}</h2>
    <vd-form
      class="lg:w-1/2"
      @submit="onSubmit"
      @reset="onReset"
      :config="config"
    ></vd-form>
  </vd-card>
</template>
