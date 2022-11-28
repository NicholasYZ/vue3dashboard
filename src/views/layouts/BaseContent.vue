<template>
  <div class="p-5">
    <div class="mb-5 flex">
      <vd-tag
        v-for="item in tagsStore.tags"
        @del="tagsStore.del"
        :key="item.name"
        :item="item"
      >
        <el-icon
          v-if="item.name !== 'dashboard'"
          @click="onDel(item)"
          class="cursor-pointer"
        >
          <vd-icon icon="Close" />
        </el-icon>
      </vd-tag>
    </div>
    <RouterView :key="key" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useTags } from "@/store";
type tagsProps = {
  name: string;
  path: string;
};
const tagsStore = useTags();
const route = useRoute();
const key = computed(() => route.fullPath);
const onDel = (item: tagsProps) => {
  tagsStore.del(item);
};
</script>
