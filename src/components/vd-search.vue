<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import dayjs from "dayjs";

const props = defineProps(["config"]);

const loading = ref(false);
const formRef = ref<FormInstance>();
const router = useRouter();
const route = useRoute();
const { path, query } = route;
const form = ref<{ [key: string]: any }>({});

const dict: any = {};

onMounted(async () => {
  props.config.forEach((item: any) => {
    dict[item.prop] = item.type;
    if (item.val && item.type === "daterange") {
      form.value[item.prop] = [item.val[0], item.val[1]];
    }
  });
  for (let prop in query) {
    const arr = prop.split(".");
    if (arr[0] === "start" || arr[0] === "end") {
      form.value[arr[1]] = [query[`start.${arr[1]}`], query[`end.${arr[1]}`]];
    } else {
      form.value[prop] = query[prop];
    }
  }
});

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  const formData = { ...form.value };

  try {
    await formEl.validate();
    formData.page = 1;

    for (let prop in formData) {
      if (dict[prop] === "datepicker") {
        formData[prop] =
          formData[prop] && dayjs(formData[prop]).format("YYYY-MM-DD HH:mm:ss");
      }
      if (formData[prop] && dict[prop] === "daterange") {
        formData[`start.${prop}`] =
          formData[prop][0] && dayjs(formData[prop][0]).format("YYYY-MM-DD");
        formData[`end.${prop}`] =
          formData[prop][1] && dayjs(formData[prop][1]).format("YYYY-MM-DD");
        delete formData[prop];
      }
      if (!formData[prop]) {
        delete formData[prop];
      }
    }

    router.push({
      path,
      query: formData,
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
      <el-form-item
        v-for="field in config"
        :label="field.label"
        :key="field.prop"
      >
        <el-input
          v-if="field.type === 'text' || !field.type"
          :size="field.size || 'default'"
          v-model="form[field.prop]"
          :placeholder="$t(field.placeholder)"
          type="text"
        />

        <el-select
          v-if="field.type === 'select' || !field.type"
          v-model="form[field.prop]"
          style="width: 100%"
          :placeholder="$t(field.placeholder)"
          :size="field.size || 'default'"
        >
          <el-option
            v-for="(val, key) in field.dict"
            :key="key"
            :label="$t(val)"
            :value="key"
          />
        </el-select>

        <el-date-picker
          v-if="field.type === 'datepicker'"
          v-model="form[field.prop]"
          type="date"
          :size="field.size || 'default'"
          :disabled="field.disabled"
          :placeholder="field.placeholder"
          class="vd-input"
        />
        <el-date-picker
          v-model="form[field.prop]"
          v-if="field.type === 'daterange'"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-value="[new Date(2023, 8, 1), new Date(2023, 11, 31)]"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          size="default"
          auto-insert-space
          @click="onSubmit(formRef)"
          round
          type="primary"
        >
          {{ $t("confirm") }}
        </el-button>
        <el-button
          size="default"
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
