<template>
  <router-link
    :class="{
      'text-blue-600': route.path === item.path,
    }"
    class="h-8 px-4 mr-2 bg-white hover:bg-gray-50 text-slate-800 transition-all duration-300 rounded-md text-sm leading-8 inline-block"
    :to="item.path"
  >
    {{ $t(item.name) }}
  </router-link>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
defineProps(["item"]);
</script>
