<script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "@/hooks";
import { sleep } from "@/utils";
import { ElMessage } from "element-plus";
const { dataSource, loading } = useFetch("/system");

type formProps = {
  [key: string]: any;
};
const config = ref({
  title: "Form 表单",
  form: ref<formProps>(dataSource),
  rules: {
    id: [{ required: true }],
    name: [{ required: true }],
    email: [{ required: true }],
    first_name: [{ required: true }],
    last_name: [{ required: true }],
    avatar: [{ required: true }],
  },
});
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
console.log(dataSource)
</script>
<template>
  <vd-card v-loading="loading">
    <h2 class="text-2xl mb-6">{{ config.title }}</h2>
    <vd-form :config="config" @submit="onSave">
      <el-row>
        <vd-field
          name="ID"
          prop="id"
          type="text"
          v-model:val="config.form.id"
          size="large"
          :span="12"
        />
      </el-row>
    </vd-form>
  </vd-card>
</template>
