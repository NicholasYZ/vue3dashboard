<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { FormInstance } from "element-plus";
import { i18next } from "@/i18n";
import { sleep, useExport } from "@/utils";
import type { ObjProps } from "@/types";
import { ListKey } from "@/types";

const route = useRoute();
const router = useRouter();

const exportToCsv = useExport();

const { data, config, onAdd } = inject(ListKey, {});

const checkedColumns = ref<string[]>(
  config.columns.map((i: ObjProps) => i.prop)
);

const columns = computed(() => {
  return config.columns.filter(
    (i: ObjProps) => checkedColumns.value.indexOf(i.prop) > -1
  );
});

const onPageChange = (page: number) => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      page,
    },
  });
};

const onSearch = async (
  formEl: FormInstance | undefined,
  query: { [key: string]: any }
) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    await sleep(200);
    router.push({
      path: route.path,
      query,
    });
  } catch (error) {
    console.log(error);
  }
};

const onReset = () => {
  router.push({
    path: route.path,
    query: {},
  });
};

const onExport = () => {
  const title = i18next.t(route.name as string);
  exportToCsv(data.value.result, title);
};
</script>
<template>
  <div class="vd-list">
    <div
      class="vd-list-bar flex md:flex-row flex-col md:mb-0 mb-4 justify-between"
    >
      <div class="vd-search">
        <vd-form
          :config="config.search"
          :hasReset="true"
          :hasSubmit="true"
          @submit="onSearch"
          @reset="onReset"
        />
      </div>
      <div class="flex md:justify-end justify-center items-center mb-4">
        <el-popover trigger="hover">
          <template #reference>
            <vd-pill>
              <Icon icon="Filter" />
            </vd-pill>
          </template>
          <el-checkbox-group v-model="checkedColumns">
            <el-checkbox
              v-for="item in config.columns"
              :key="item.prop"
              :disabled="item.prop === 'operation' || item.prop === 'id'"
              :label="item.prop"
            />
          </el-checkbox-group>
        </el-popover>
        <vd-pill @click="onAdd">
          <Icon icon="Plus" />
        </vd-pill>
        <vd-pill @click="onExport">
          <Icon icon="Download" />
        </vd-pill>
      </div>
    </div>
    <vd-card v-loading="data.loading">
      <vd-table :columns="columns" :dataSource="data.result" class="mb-6">
        <template v-for="(index, name) in $slots" #[name]="{ row }">
          <slot :name="name" :row="row"></slot>
        </template>
      </vd-table>
      <vd-pagination @onPageChange="onPageChange" :pageInfo="data.pageInfo" />
    </vd-card>
  </div>
</template>
