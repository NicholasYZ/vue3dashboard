<script setup lang="ts">
import { useRoute } from "vue-router";
import { useSettingStore, useRouterStore, useAuthStore } from "@/store";
const settingStore = useSettingStore();
const routerStore = useRouterStore();
const authStore = useAuthStore();
const route = useRoute();

const menuFilter = (arr: any, str: any) => {
  return arr
    .filter((item: { children: any; meta: { permissions: any } }) => {
      const {
        meta: { permissions },
      } = item;
      const hasPermission =
        permissions && permissions?.indexOf(str as string) > -1;
      return hasPermission;
    })
    .map((item: any) => {
      if (item.children && item.children.length) {
        item.children = menuFilter(item.children, str);
      }
      return item;
    });
};

const menu = menuFilter(routerStore.router, authStore.userInfo.role as string);
</script>

<template>
  <div
    class="vd-sidebar z-[2002] bg-gradient-to-b from-gray-900 to-gray-700 transition-all h-screen"
  >
    <p
      class="h-[60px] flex justify-center items-center border-b border-b-gray-800 text-center"
    >
      <router-link to="/" class="text-gray-50">VD</router-link>
    </p>
    <el-menu
      text-color="#fff"
      active-text-color="#ffd04b"
      background-color="bg-gray-800"
      :default-active="route.path"
      :collapse-transition="false"
      :collapse="settingStore.setting.sidebarStatus === 'close'"
      router
      style="--el-menu-hover-bg-color: #374151"
    >
      <el-sub-menu
        popper-class="bg-gray-800 rounded-sm"
        v-for="item in menu"
        :key="item.name"
        :index="item.path"
      >
        <template #title>
          <el-icon>
            <Icon :icon="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          style="--el-menu-hover-bg-color: #374151"
          v-for="subItem in item.children"
          :key="subItem.name"
          :index="subItem.path"
        >
          <el-icon>
            <Icon :icon="subItem.meta.icon" />
          </el-icon>
          <span>{{ subItem.meta.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
