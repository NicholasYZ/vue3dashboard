<script setup lang="ts"></script>
<template>
  <div
    class="cursor-pointer rounded-md mx-1 w-8 h-8 bg-gray-50 hover:bg-white flex items-center justify-center"
  >
    <el-icon size="20">
      <slot></slot>
    </el-icon>
  </div>
</template>
