<script setup lang="ts">
// import { ref } from "vue";
// const columns = ref<string[]>(["id", "name", "color", "pantone_value", "year"]);
const config = {
  search: {
    title: "Form 表单",
    inline: true,
    fields: [
      {
        prop: "username",
        placeholder: "UserName",
      },
      {
        prop: "city",
        placeholder: "city",
        type: "select",
        dict: {
          "1": "beijing",
          "2": "shanghai",
          "3": "guangzhou",
        },
      },
    ],
  },
  columns: ["id", "name", "color", "pantone_value", "year"],
};
</script>
<template>
  <main>
    <vd-list :config="config"></vd-list>
  </main>
</template>
