<template>
  <div class="flex md:flex-row flex-col md:mb-0 mb-4 justify-between">
    <slot name="list-bar-left"> </slot>
    <slot name="list-bar-right"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currRouteName = computed(() => route.matched.slice(-1)[0].name as string);
</script>
