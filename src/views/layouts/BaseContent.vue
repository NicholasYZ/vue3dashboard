<template>
  <div class="p-5">
    <h2 class="text-2xl mb-4">{{ $t(currRouteName) }}</h2>
    <!-- <div class="px-5 pt-5">
      <vd-tag :item="{ name: '首页' }" />
    </div> -->
    <RouterView :key="key" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
const route = useRoute();
const currRouteName = computed(() => route.matched.slice(-1)[0].name as string);
const key = computed(() => route.fullPath);
</script>
