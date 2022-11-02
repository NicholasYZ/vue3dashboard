<script setup lang="ts">
import { ref, computed, defineExpose } from "vue";
import { useRouter, useRoute } from "vue-router";
import { i18next } from "@/i18n";
import { useExport, useQuery } from "@/utils";
import type { ObjProps } from "@/types";

const { data, reload } = useQuery("/products.json");
const props = defineProps(["view", "columns", "search"]);
const route = useRoute();
const router = useRouter();
const child = ref<InstanceType<any> | null>(null);

props.search.fields.forEach((i: any) => {
  props.search.formData!.value[i.prop] = route.query[i.prop] || "";
});

const exportToCsv = useExport();

const checkedColumns = ref<string[]>(
  props.columns.map((i: ObjProps) => i.prop)
);

const filterColumns = computed(() => {
  return props.columns.filter((i: ObjProps) => i.prop !== "operation");
});

const computedColumns = computed(() => {
  return props.columns.filter(
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
    for (let prop in form.value) {
      if (form.value[prop]) {
        query[prop] = form.value[prop];
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
  router.push({
    path: route.path,
    query: {},
  });
};

const onExport = () => {
  const title = i18next.t(route.name as string);
  exportToCsv(data.value.result, title);
};

const onAdd = () => {
  props.view!.formData.value = {};
  child.value.toggleModel();
};
const onView = (form: ObjProps) => {
  props.view!.formData.value = form;
  child.value.toggleModel();
};
const onEdit = (form: ObjProps) => {
  props.view!.formData.value = form;
  child.value.toggleModel();
};
const onDel = (form: ObjProps) => {
  props.view!.formData.value = form;
  child.value.toggleModel();
};
const onSave = (form: ObjProps) => {
  child.value.toggleModel();
  reload();
};

defineExpose({
  onAdd,
  onView,
  onEdit,
  onDel,
  onSave,
});
</script>
<template>
  <div class="vd-list">
    <div
      class="vd-list-bar flex md:flex-row flex-col md:mb-0 mb-4 justify-between"
    >
      <div class="vd-search">
        <vd-form :config="search" @submit="onSearch" @reset="onReset" />
      </div>
      <div class="flex md:justify-end justify-center items-center mb-4">
        <el-popover trigger="hover">
          <template #reference>
            <vd-pill>
              <Icon icon="Filter" />
            </vd-pill>
          </template>
          <el-checkbox-group v-model="checkedColumns">
            <p :key="item.prop" v-for="item in filterColumns">
              <el-checkbox
                :disabled="item.filterDisabled"
                :key="item.prop"
                :label="item.prop"
              />
            </p>
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
      <vd-table
        :columns="computedColumns"
        :dataSource="data.result"
        class="mb-6"
      >
        <template v-for="(index, name) in $slots" v-slot:[name]="{ row }">
          <slot :name="name" :row="row"></slot>
        </template>
      </vd-table>
      <vd-pagination @onPageChange="onPageChange" :pageInfo="data.pageInfo" />
    </vd-card>
  </div>
  <vd-view v-if="view" ref="child" :config="view" @onSave="onSave" />
</template>
