<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { ref } from "vue";
import { sleep } from "@/utils";

const props = defineProps(["form", "rules"]);
const emit = defineEmits(["submit", "reset"]);
const loading = ref(false);
const formRef = ref<FormInstance>();

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    await sleep(200);
    emit("submit", props.form);
  } catch (error) {
    console.log(error);
  }
};

const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emit("reset");
};
</script>
<template>
  <el-form
    :model="form"
    :rules="rules"
    label-width="120px"
    ref="formRef"
    v-loading="loading"
  >
    <slot></slot>
    <el-form-item>
      <el-button
        size="large"
        auto-insert-space
        @click="onSubmit(formRef)"
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
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.el-form--inline {
  .el-form-item {
    margin-right: 12px;
    &__label {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
