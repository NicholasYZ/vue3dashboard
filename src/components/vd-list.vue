<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { i18next } from "@/i18n";
import { useExport } from "@/utils";
import type { ObjProps } from "@/types";
import { ListKey } from "@/types";

const { data, methods } = inject(ListKey, {});
const props = defineProps(["config"]);
const route = useRoute();
const router = useRouter();

const formData: ObjProps = ref({});
props.config.search.fields.forEach((i: any) => {
  formData.value[i.prop] = route.query[i.prop] || "";
});

const exportToCsv = useExport();

const checkedColumns = ref<string[]>(
  props.config.columns.map((i: ObjProps) => i.prop)
);

const columns = computed(() => {
  return props.config.columns.filter(
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

const onSearch = async (form: ObjProps) => {
  const query: ObjProps = {};
  try {
    for (let prop in form) {
      if (form[prop]) {
        query[prop] = form[prop];
      }
    }
    router.push({
      path: route.path,
      query,
    });
  } catch (error) {
    console.log(error);
  }
};

const onReset = () => {
  methods.clear();
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
          :formData="formData"
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
        <vd-pill @click="methods.add">
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
