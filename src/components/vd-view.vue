<script setup lang="ts">
defineProps(["isAddFormVisable", "config"]);
const onCancel = () => {
  console.log("hello");
};
</script>
<template>
  <el-dialog
    @closed="onCancel"
    destroy-on-close
    :title="$t('create')"
    :value="isAddFormVisable"
  >
    <vd-form :hasSubmit="true" :config="config" />
  </el-dialog>
</template>
