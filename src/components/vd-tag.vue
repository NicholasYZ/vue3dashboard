<template>
  <router-link
    :class="{ 'bg-blue-600 text-white': route.path === item.path }"
    class="h-8 px-4 mr-2 bg-white rounded-md text-sm leading-8 inline-block"
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
