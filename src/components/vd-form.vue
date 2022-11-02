<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { computed, ref } from "vue";
import { useSettingStore } from "@/store";
import { sleep } from "@/utils";

const store = useSettingStore();
const props = defineProps(["config"]);
const emit = defineEmits(["submit", "cancel", "reset"]);
const loading = ref(false);
const formRef = ref<FormInstance>();

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    await sleep(200);
    if (props.config.extra.includes("submit")) {
      emit("submit", props.config.formData);
    } else {
      console.log(1);
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
    :model="config.formData"
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
      v-model:val="config.formData.value![item.prop]"
    />
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
        v-if="props.config.extra.includes('reset')"
        size="large"
        @click="onReset(formRef)"
        auto-insert-space
        type="default"
        round
      >
        {{ $t("reset") }}
      </el-button>
      <el-button
        v-else
        size="large"
        @click="onCancel(formRef)"
        auto-insert-space
        type="default"
        round
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
