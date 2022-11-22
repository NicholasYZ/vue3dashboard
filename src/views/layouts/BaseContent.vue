<template>
  <div class="p-5">
    <div class="mb-5">
      <vd-tag v-for="item in tagsStore.tags" :key="item.name" :item="item" />
    </div>
    <RouterView :key="key" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useTags } from "@/store";
const tagsStore = useTags();
const route = useRoute();
const key = computed(() => route.fullPath);
</script>
