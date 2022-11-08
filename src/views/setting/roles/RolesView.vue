<template>
  <el-dialog
    destroy-on-close
    :title="$t(formType)"
    v-model="isModelVisible"
    :style="{
      borderRadius: '10px',
    }"
    width="500px"
  >
    <el-form
      v-loading="loading"
      ref="formRef"
      :model="form"
      label-width="80px"
      :rules="rules"
    >
      <vd-field
        name="ID"
        prop="id"
        type="text"
        :span="24"
        v-if="formType !== 'add'"
        disabled
        v-model:val="form.id"
        size="large"
      />
      <vd-field
        name="Type"
        prop="type"
        type="select"
        :span="24"
        v-model:val="form.type"
        size="large"
      />
    </el-form>
    <template #footer>
      <el-button
        size="large"
        @click="onSubmit(formRef)"
        auto-insert-space
        type="primary"
        round
      >
        {{ $t("confirm") }}
      </el-button>
      <el-button
        size="large"
        @click="onReset(formRef)"
        auto-insert-space
        type="default"
        round
      >
        {{ $t("reset") }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance } from "element-plus";

const isModelVisible = ref<boolean>(false);
const loading = ref(false);
const formRef = ref<FormInstance>();
const formType = ref<string>("add");

type formProps = {
  id: string;
  type: string;
};

const form = ref<formProps>({
  id: "",
  type: "",
});

const rules = {
  id: [{ required: true }],
  type: [{ required: true }],
};

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    loading.value = true;
    await formEl.validate();
    isModelVisible.value = false;
    console.log(form);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const showForm = (item = { id: "", type: "" }, type = "add") => {
  isModelVisible.value = true;
  formType.value = type;
  form.value = { ...item };
};

defineExpose({
  showForm,
});
</script>
