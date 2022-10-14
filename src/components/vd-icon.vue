<template>
  <div>
    <svg aria-hidden="true" class="vd-icon">
      <use :xlink:href="symbolId" :fill="color" />
    </svg>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<style scoped>
.vd-icon {
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
  overflow: hidden;
  fill: currentColor;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
