<script setup lang="ts">
defineProps(["title"]);
</script>
<template>
  <div class="bg-slate-100 rounded py-4 px-6 dark:bg-slate-800">
    <h2 class="mb-4">{{ title }}</h2>
    <el-form>
      <el-form-item label="" prop="username">
        <el-input size="large" placeholder="登录名" type="text" />
      </el-form-item>
    </el-form>

    <div class="mb-4">
      <el-button size="large" type="primary" style="width: 100%"
        >确定</el-button
      >
    </div>
  </div>
</template>
