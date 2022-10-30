<script setup lang="ts">
const props = defineProps(["title"]);
</script>
<template>
  <div class="bg-white rounded-md p-6">
    <slot></slot>
  </div>
</template>
