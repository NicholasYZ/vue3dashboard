<script setup lang="ts">
import { ref } from "vue";
const columns = ref<string[]>(["id", "name", "color", "pantone_value", "year"]);
</script>
<template>
  <main>
    <!-- <h1 v-permissions="['admin']">admin</h1>
    <h1 v-permissions="['editor']">editor</h1> -->
    <vd-list :columns="columns"></vd-list>
  </main>
</template>
