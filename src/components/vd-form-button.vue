<template>
  <el-form-item>
    <el-button
      size="large"
      @click="onSubmit"
      auto-insert-space
      round
      type="primary"
    >
      {{ $t("confirm") }}
    </el-button>
    <el-button size="large" @click="onReset" round auto-insert-space>
      {{ $t("reset") }}
    </el-button>
  </el-form-item>
</template>

<script setup lang="ts">
const emit = defineEmits(["submit", "reset"]);
const onSubmit = () => {
  emit("submit");
};
const onReset = () => {
  emit("reset");
};
</script>
