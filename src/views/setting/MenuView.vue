<script setup lang="ts">
import { ref } from "vue";
const columns = ref<string[]>(["id", "name", "color", "pantone_value", "year"]);
</script>
<template>
  <main>
    <vd-list :columns="columns"></vd-list>
  </main>
</template>
