<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
const router = useRoute();
const currRouteName = computed(
  () => router.matched.slice(-1)[0].name as string
);
</script>

<template>
  <main class="rounded-md p-6 bg-[#fff]">
    <!-- <h2 class="text-2xl mb-4">{{ $t(currRouteName) }}</h2> -->
    <RouterView />
  </main>
</template>
