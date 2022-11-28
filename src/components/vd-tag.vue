<template>
  <div
    class="flex justify-center items-center shrink-0 flex-nowrap h-8 pl-4 pr-3 mr-2 bg-white hover:bg-gray-50 text-slate-800 transition-all duration-300 rounded-md text-sm leading-8 inline-block"
  >
    <router-link
      :class="{
        'text-blue-600': route.path === item.path,
      }"
      class="mr-1"
      :to="item.path"
    >
      {{ $t(item.name) }}
    </router-link>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
defineProps(["item"]);
</script>
