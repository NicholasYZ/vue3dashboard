<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { computed, ref } from "vue";
import { useSettingStore } from "@/store";
import { sleep } from "@/utils";

const store = useSettingStore();
const props = defineProps(["config", "hasSubmit", "hasReset", "form"]);
const emit = defineEmits(["submit", "cancel", "reset"]);

const form = props.form || {};

const loading = ref(false);
const formRef = ref<FormInstance>();

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    await sleep(200);
    if (!props.hasSubmit) {
      console.log(1);
    } else {
      emit("submit", form.value);
    }
  } catch (error) {
    console.log(error);
  }
};

const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emit("reset");
};

const onCancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emit("cancel");
};

const isInline = computed(() => {
  const isMobile = store.setting.deviceType === "mobile";
  return props.config.inline && !isMobile;
});
</script>
<template>
  <el-form
    :model="form"
    :inline="isInline"
    :rules="config.rules"
    :label-width="!isInline ? '120px' : ''"
    ref="formRef"
    v-loading="loading"
  >
    <vd-field
      v-for="item in config.fields"
      :key="item.prop"
      :item="item"
      v-model:val="form[item.prop]"
    />
    <el-form-item>
      <el-button
        size="large"
        auto-insert-space
        @click="onSubmit(formRef)"
        type="primary"
      >
        {{ $t("confirm") }}
      </el-button>
      <el-button
        v-if="hasReset"
        size="large"
        @click="onReset(formRef)"
        auto-insert-space
        type="default"
      >
        {{ $t("reset") }}
      </el-button>
      <el-button
        v-else
        size="large"
        @click="onCancel(formRef)"
        auto-insert-space
        type="default"
      >
        {{ $t("cancel") }}
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
