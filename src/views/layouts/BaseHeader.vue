<script setup lang="ts">
import { useSettingStore } from "@/store";
const store = useSettingStore();
const onClick = () => {
  store.setSidebarStatus();
};
</script>
<template>
  <div
    class="h-[60px] sticky flex items-center justify-between border-b bg-gray-50 border-gray-200 px-4"
  >
    <el-icon class="cursor-pointer" @click.stop="onClick" color="text-gray-900">
      <el-icon>
        <Icon
          :icon="store.setting.sidebarStatus !== 'open' ? 'Expand' : 'Fold'"
        />
      </el-icon>
    </el-icon>
    <el-popover>
      <p class="flex items-center cursor-pointer">
        <el-icon><Icon icon="SwitchButton" /></el-icon>
        <router-link class="text-slate-500 pl-2 text-sm" to="/login">
          退出
        </router-link>
      </p>
      <template #reference>
        <p class="flex items-center cursor-pointer">
          <el-icon><User /></el-icon>
          <span class="text-slate-500 pl-2 text-sm">admin</span>
        </p>
      </template>
    </el-popover>
  </div>
</template>
