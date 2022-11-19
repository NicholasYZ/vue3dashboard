<template>
  <div class="p-5">
    <vd-breadcrumb />
    <h2 class="text-2xl mb-4">{{ $t(currRouteName) }}</h2>
    <RouterView :key="key" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
const route = useRoute();
const currRouteName = computed(() => route.matched.slice(-1)[0].name as string);
const key = computed(() => {
  return route.fullPath;
});
</script>
