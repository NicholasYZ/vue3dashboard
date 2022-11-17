<template>
  <vd-card v-permissions="['admin', 'editor']"> Admin </vd-card>
  <vd-card v-permissions="['editor']"> Editor </vd-card>
</template>

<script setup lang="ts"></script>
