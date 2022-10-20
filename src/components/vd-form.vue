<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { computed, reactive, ref } from "vue";
import { useSettingStore } from "@/store";

const store = useSettingStore();
const props = defineProps(["config", "hasSubmit"]);
const emit = defineEmits(["formSubmit"]);

type fieldsProps = {
  form: { [key: string]: any };
  rules: { [key: string]: any };
};

const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const fields: fieldsProps = { form: {}, rules: {} } as fieldsProps;

props.config.fields.forEach(
  (item: { [x: string]: any; prop: string | number }) => {
    fields.form[item.prop] = "";
    fields.rules[item.prop] = item.rules;
  }
);
const form = reactive(fields.form);
const rules = reactive<FormRules>(fields.rules);

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (props.config.hasSubmit) {
    emit("formSubmit", formEl);
    return;
  }
  loading.value = true;
  try {
    await formEl.validate();
    console.log(form);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const isInline = computed(() => {
  const isMobile = store.setting.deviceType === "mobile";
  return props.config.inline && !isMobile;
});
</script>
<template>
  <!-- <h2 class="mb-4 text-lg">{{ config.title }}</h2> -->
  <el-form
    :model="form"
    :inline="isInline"
    :rules="rules || []"
    :label-width="!isInline ? '80px' : ''"
    ref="ruleFormRef"
  >
    <el-form-item
      v-for="item in props.config.fields"
      :key="item.prop"
      :label="$t(item.prop)"
      :prop="item.prop"
    >
      <el-input
        size="large"
        v-model="form[item.prop]"
        :placeholder="$t(item.prop)"
        type="text"
      />
    </el-form-item>

    <el-form-item>
      <el-button size="large" @click="onSubmit(ruleFormRef)" type="primary">
        {{ $t("confirm") }}
      </el-button>
      <el-button size="large" type="default">
        {{ $t("cancel") }}
      </el-button>
    </el-form-item>
  </el-form>

  <!-- <div class="mb-4">
    <el-button size="large" @click="onSubmit(ruleFormRef)" type="primary">
      确定
    </el-button>
    <el-button size="large" type="default">取消</el-button>
  </div> -->
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
