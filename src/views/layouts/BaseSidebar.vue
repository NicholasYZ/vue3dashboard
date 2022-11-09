<script setup lang="ts">
import { useRoute } from "vue-router";
import { useSettingStore, useRouterStore, useAuthStore } from "@/store";
import { computed } from "vue";
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

const isSidebarOpened = computed(() => {
  return settingStore.setting.sidebarStatus === "open";
});
</script>

<template>
  <div class="vd-sidebar z-[1001] bg-slate-900 transition-all h-screen">
    <p
      class="h-[60px] flex justify-center items-center border-b border-b-slate-800 text-center"
    >
      <router-link to="/" class="text-slate-50 text-xl">VD</router-link>
    </p>
    <el-scrollbar class="transition-all" :class="{ 'p-2': isSidebarOpened }">
      <el-menu
        text-color="#f8fafc"
        active-text-color="#fbbf24"
        background-color="bg-slate-900"
        :default-active="route.path"
        :collapse-transition="false"
        :collapse="settingStore.setting.sidebarStatus === 'close'"
        router
        unique-opened
        style="--el-menu-hover-bg-color: #1e293b"
      >
        <el-sub-menu
          popper-class="bg-slate-900 rounded-md px-2"
          v-for="item in menu"
          :key="item.name"
          :index="item.path"
        >
          <template #title>
            <el-icon>
              <Icon :icon="item.meta.icon" />
            </el-icon>
            <span>{{ $t(item.name) }}</span>
          </template>
          <el-menu-item
            style="--el-menu-hover-bg-color: #1e293b"
            v-for="subItem in item.children"
            :key="subItem.name"
            :index="subItem.path"
            class="my-1 rounded-md"
          >
            <el-icon>
              <Icon :icon="subItem.meta.icon" />
            </el-icon>
            <span>{{ $t(subItem.name) }}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<style lang="scss">
.el-menu-item {
  &.is-active {
    background: #1e293b !important;
    &::before {
      content: "";
      display: block;
      width: 6px;
      height: 100%;
      opacity: 0.5;
      background: #475569;
      position: absolute;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      left: 0;
      top: 0;
      transition: all 0.3s ease;
    }
  }
}
.el-sub-menu {
  &__title {
    border-radius: 6px;
  }
}
</style>
