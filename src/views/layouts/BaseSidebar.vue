<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useRoute } from "vue-router";
import { useSettingStore, useRouterStore } from "@/store";
import Menu from "@/views/layouts/components/BaseMenu.vue";
import MenuItem from "@/views/layouts/components/BaseMenuItem.vue";

const settingStore = useSettingStore();
const routerStore = useRouterStore();
const { routes } = toRefs(routerStore);
const { setting } = toRefs(settingStore);
const route = useRoute();
const sidebarStatus = computed(() => setting.value.sidebarStatus === "open");
</script>

<template>
  <div class="vd-sidebar z-[1001] bg-slate-900 transition-all h-screen">
    <h1
      class="h-[60px] flex justify-center items-center border-b border-b-slate-800 text-center"
    >
      <router-link to="/" class="text-slate-50 text-xl font-bold">
        V3D
      </router-link>
    </h1>
    <Menu :active="route.path" :sidebarStatus="sidebarStatus">
      <MenuItem :key="item.name" :route="item" v-for="item in routes" />
    </Menu>
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
