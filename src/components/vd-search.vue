<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

defineProps(["config"]);

const loading = ref(false);
const formRef = ref<FormInstance>();
const router = useRouter();
const route = useRoute();
const { path, query } = route;
const form = ref<{ [key: string]: any }>({});

for (let prop in query) {
  form.value[prop] = query[prop];
}

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    form.value.page = 1;
    router.push({
      path,
      query: form.value,
    });
  } catch (error) {
    console.log(error);
  }
};

const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  form.value = {};
  router.push({
    path,
    query: form.value,
  });
};
</script>
<template>
  <div>
    <el-form :model="form" inline ref="formRef" v-loading="loading">
      <el-form-item v-for="field in config" :key="field.prop">
        <el-input
          v-if="field.type === 'text' || !field.type"
          :size="field.size || 'large'"
          v-model="form[field.prop]"
          :placeholder="$t(field.placeholder)"
          type="text"
        />

        <el-select
          v-if="field.type === 'select' || !field.type"
          v-model="form[field.prop]"
          style="width: 100%"
          :placeholder="$t(field.placeholder)"
          :size="field.size || 'large'"
        >
          <el-option
            v-for="(val, key) in field.dict"
            :key="key"
            :label="$t(val)"
            :value="key"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          size="large"
          auto-insert-space
          @click="onSubmit(formRef)"
          round
          type="primary"
        >
          {{ $t("confirm") }}
        </el-button>
        <el-button
          size="large"
          @click="onReset(formRef)"
          auto-insert-space
          round
          type="default"
        >
          {{ $t("reset") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
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
