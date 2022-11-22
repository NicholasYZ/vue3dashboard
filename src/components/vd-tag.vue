<template>
  <span class="py-2 px-4 bg-white rounded text-sm">{{ item.name }}</span>
</template>
<script setup lang="ts">
defineProps(["item"]);
</script>
