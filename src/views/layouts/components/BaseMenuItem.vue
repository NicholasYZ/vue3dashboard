<template>
  <el-sub-menu
    popper-class="bg-slate-900 rounded-md px-2"
    v-if="route.children"
    :key="route.name"
    :index="route.path"
  >
    <template #title>
      <el-icon>
        <vd-icon :icon="route.meta.icon" />
      </el-icon>
      <span>{{ $t(route.name) }}</span>
    </template>
    <el-menu-item
      style="--el-menu-hover-bg-color: #1e293b"
      v-for="item in route.children"
      :key="item.name"
      :index="item.path"
      class="my-1 rounded-md"
    >
      <el-icon>
        <vd-icon :icon="item.meta.icon" />
      </el-icon>
      <span>{{ $t(item.name) }}</span>
    </el-menu-item>
  </el-sub-menu>

  <el-menu-item
    style="--el-menu-hover-bg-color: #1e293b"
    v-else
    :index="route.path"
    class="my-1 rounded-md"
  >
    <el-icon>
      <vd-icon :icon="route.meta.icon" />
    </el-icon>
    <span>{{ $t(route.name) }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
defineProps(["route"]);
</script>
