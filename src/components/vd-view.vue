<script setup lang="ts">
import { computed, inject } from "vue";
import { useSettingStore } from "@/store";
import { ListKey } from "@/types";

const settingStore = useSettingStore();
const { methods, formData, isModelVisible } = inject(ListKey, {});
defineProps(["config"]);
const onSubmit = (form: any) => {
  methods.save(form);
};

const isFullScreen = computed(() => {
  return settingStore.setting.deviceType === "mobile";
})

</script>
<template>
  <el-dialog
    destroy-on-close
    :fullscreen="isFullScreen"
    :title="$t('create')"
    v-model="isModelVisible"
    :style="{
      borderRadius: isFullScreen ? 0 : '10px',
    }"
  >
    <vd-form
      :hasSubmit="true"
      @submit="onSubmit"
      @cancel="methods.toggle"
      :config="config"
      :formData="formData"
    />
  </el-dialog>
</template>
