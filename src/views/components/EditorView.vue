<template>
  <editor
    :init="{
      plugins: 'lists link image table code help wordcount',
    }"
    api-key="43ecg1rs74p7xwbbsd0tpbh8w4gaipwcy713okpd92jcr8ga"
  />
</template>

<script setup lang="ts">
import Editor from "@tinymce/tinymce-vue";
</script>
