<script setup lang="ts">
import { ref } from "vue";
import { useFetch, sleep } from "@/utils";
import { ElMessage } from "element-plus";
const { dataSource, loading } = useFetch("/users/1");
type formProps = {
  [key: string]: any;
};

const form = ref<formProps>(dataSource);
const rules = {
  id: [{ required: true }],
  name: [{ required: true }],
  email: [{ required: true }],
  first_name: [{ required: true }],
  last_name: [{ required: true }],
  avatar: [{ required: true }],
};

const onSave = async (query: { [key: string]: any }) => {
  try {
    console.log(query);
    loading.value = true;
    await sleep(500);
    ElMessage({
      message: "Congrats, this is a success message.",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <vd-card v-loading="loading">
    <h2 class="text-2xl mb-6">表单</h2>
    <vd-form :form="form" :rules="rules" @submit="onSave">
      <vd-field
        name="ID"
        prop="id"
        type="text"
        v-model:val="form.id"
        size="large"
      />
      <vd-field
        name="Email"
        prop="email"
        type="text"
        v-model:val="form.email"
        size="large"
      />
      <vd-field
        name="First Name"
        prop="first_name"
        type="text"
        v-model:val="form.first_name"
        size="large"
      />
      <vd-field
        name="Avatar"
        prop="avatar"
        type="text"
        v-model:val="form.avatar"
        size="large"
      >
        <img :src="form.avatar" class="w-20 h-20 rounded" />
      </vd-field>
    </vd-form>
  </vd-card>
</template>
