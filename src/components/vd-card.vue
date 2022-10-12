<script setup lang="ts">
const props = defineProps(["title"]);
</script>
<template>
  <div class="card">{{ props.title }}</div>
</template>
