<script setup lang="ts">
import { inject } from "vue";
import { ListKey } from "@/types";
const { methods, selectedItem, isModelVisible } = inject(ListKey, {});
defineProps(["config"]);
const onSubmit = (form: any) => {
  methods.save(form);
};
</script>
<template>
  <el-dialog destroy-on-close :title="$t('create')" v-model="isModelVisible">
    <vd-form
      :hasSubmit="true"
      @submit="onSubmit"
      @cancel="methods.toggle"
      :config="config"
      :form="selectedItem"
    />
  </el-dialog>
</template>
