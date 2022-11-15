<script setup lang="ts">
import { i18next } from "@/i18n";
import { useSettingStore } from "@/store";
const store = useSettingStore();
const handleSidebarStatus = () => {
  store.setSidebarStatus();
};
const handleLanguage = (language: string) => {
  store.setLanguage(language);
  i18next.changeLanguage(language);
};
</script>
<template>
  <div
    class="vd-header z-40 h-[60px] transition-all flex items-center justify-between border-b bg-gray-50 border-gray-200 px-4"
  >
    <div class="flex items-center justify-between">
      <el-icon
        class="cursor-pointer"
        @click.stop="handleSidebarStatus"
        color="text-gray-900"
      >
        <vd-icon
          :icon="store.setting.sidebarStatus !== 'open' ? 'Expand' : 'Fold'"
        />
      </el-icon>
    </div>

    <div class="flex">
      <el-dropdown @command="handleLanguage" trigger="click">
        <p class="flex items-center cursor-pointer">
          <vd-svg-icon color="#333" name="language" />
        </p>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown trigger="click">
        <p class="flex items-center cursor-pointer">
          <el-icon><vd-icon icon="User" /></el-icon>
          <span class="text-slate-500 pl-2 text-base">admin</span>
        </p>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="SwitchButton">
              <router-link class="text-slate-500 pl-2 text-base" to="/login">
                {{ $t("logout") }}
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
