<template>
  <el-dialog
    destroy-on-close
    :title="$t(title)"
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
      <el-row>
        <vd-field
          name="ID"
          prop="id"
          type="text"
          v-model:val="form.id"
          size="large"
          v-if="formType !== 'add'"
        />
        <vd-field name="Pid" prop="pid" v-model:val="form.pid" size="large">
          <el-tree-select
            v-model="form.pid"
            :data="treeData"
            :render-after-expand="false"
            :check-strictly="true"
            size="large"
            style="width: 100%"
          />
        </vd-field>
        <vd-field
          name="Name"
          prop="name"
          type="text"
          v-model:val="form.name"
          size="large"
        />
        <vd-field
          name="Icon"
          prop="icon"
          type="text"
          v-model:val="form.icon"
          size="large"
        >
          <vd-icon-box :icon="form.icon" />
        </vd-field>
        <vd-field
          name="Path"
          prop="path"
          type="text"
          v-model:val="form.path"
          size="large"
        />
      </el-row>
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
import { get } from "@/utils";
defineProps(["title"]);

const isModelVisible = ref<boolean>(false);
const loading = ref(false);
const formRef = ref<FormInstance>();
const formType = ref<string>("add");

type treeProps = {
  value: string;
  label: string;
  children: treeProps;
};

type formProps = { [key: string]: any };

const treeData = ref<treeProps>({} as treeProps);
const form = ref<formProps>({} as formProps);

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

const loadTree = async () => {
  const { result } = await get("/routes");
  const loadMenu = (arr: any[]): any => {
    return arr.map(({ id, children = [], meta }: any) => {
      const { title } = meta;
      return {
        value: id,
        label: title,
        children: loadMenu(children),
      };
    });
  };
  return loadMenu(result);
};

const showForm = async (item = { id: "", type: "" }, type = "add") => {
  treeData.value = await loadTree();
  isModelVisible.value = true;
  formType.value = type;
  form.value = { ...item };
};

defineExpose({
  showForm,
});
</script>
