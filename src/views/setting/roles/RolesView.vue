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
        name="角色名"
        prop="type"
        type="text"
        :span="24"
        v-model:val="form.type"
        size="large"
      />
      <vd-field
        name="菜单"
        prop="menu"
        v-model:val="form.permissions"
        size="large"
      >
        <el-tree-select
          v-model="form.permissions"
          :data="treeData"
          :render-after-expand="false"
          :check-strictly="true"
          multiple
          show-checkbox
          size="large"
          style="width: 100%"
        />
      </vd-field>
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
import { getMenu } from "@/api";

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
  const { result } = await getMenu();
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

const showForm = async (
  item = { id: "", type: "", permissions: [] },
  type = "add"
) => {
  treeData.value = await loadTree();
  isModelVisible.value = true;
  formType.value = type;
  form.value = {
    ...item,
    permissions: item.permissions.map((i: any) => i.id),
  };
};
defineExpose({
  showForm,
});
</script>
