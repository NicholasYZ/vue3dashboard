<script setup lang="ts">
import type { FormInstance, FormRules, FormProps } from "element-plus";
import { computed, reactive, ref } from "vue";
import { useSettingStore } from "@/store";
import { sleep } from "@/utils";

const store = useSettingStore();
const props = defineProps(["config", "hasSubmit"]);
const emit = defineEmits(["formSubmit"]);

type fieldsProps = {
  form: { [key: string]: any };
  rules: { [key: string]: any };
};

const loading = ref(false);
const formRef = ref<FormInstance>();
const fields: fieldsProps = { form: {}, rules: {} } as fieldsProps;

console.log(props.config.fields)
props.config.fields.forEach(
  (item: { [x: string]: any; prop: string | number }) => {
    fields.form[item.prop] = item.value || "";
    fields.rules[item.prop] = item.rules;
  }
);

const form = reactive(fields.form);
const rules = reactive<FormRules>(fields.rules);

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!props.hasSubmit) {
    if (!formEl) return;
    loading.value = true;
    try {
      await formEl.validate();
      await sleep(200);
      console.log(form);
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  } else {
    emit("formSubmit", formEl, fields.form);
  }
};

const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
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
    :rules="rules || []"
    :label-width="!isInline ? '120px' : ''"
    ref="formRef"
    v-loading="loading"
  >
    <vd-field
      v-for="item in props.config.fields"
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
        size="large"
        @click="onReset(formRef)"
        auto-insert-space
        type="default"
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
