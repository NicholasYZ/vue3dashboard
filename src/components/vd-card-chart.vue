<script setup lang="ts">
import VChart from "@/utils/charts";
defineProps(["option"]);
</script>

<template>
  <vd-card>
    <v-chart autoresize :option="option" />
  </vd-card>
</template>
