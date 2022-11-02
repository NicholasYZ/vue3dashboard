<script setup lang="ts">
import { computed, ref } from "vue";
import { useSettingStore } from "@/store";

const settingStore = useSettingStore();
const props = defineProps(["config"]);
const emit = defineEmits(["onSave"]);
const isModelVisible = ref<boolean>(false);

const onSubmit = async (form: any) => {
  emit("onSave", form);
  isModelVisible.value = false;
};

const isFullScreen = computed(() => {
  return settingStore.setting.deviceType === "mobile";
});

const toggleModel = () => {
  isModelVisible.value = !isModelVisible.value;
};

defineExpose({
  toggleModel,
});
</script>
<template>
  <el-dialog
    destroy-on-close
    :fullscreen="isFullScreen"
    :title="$t('add')"
    v-model="isModelVisible"
    :style="{
      borderRadius: isFullScreen ? 0 : '10px',
    }"
  >
    <vd-form :hasSubmit="true" @submit="onSubmit" :config="config" />
  </el-dialog>
</template>
