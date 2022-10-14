<script setup lang="ts">
import { RouterView } from "vue-router";
import { computed } from "vue";

// 导入 Element Plus 语言包
import zh from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { useSettingStore } from "@/store";

const store = useSettingStore();
const language = computed(() => store.setting.language);
const lang: { [key: string]: typeof zh } = {
  zh,
  en,
};
const locale = computed(() => lang[language.value]);
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>
