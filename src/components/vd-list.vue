<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { i18next } from "@/i18n";
import { useExport } from "@/utils";
import type { ObjProps } from "@/types";
const route = useRoute();
const router = useRouter();
const props = defineProps(["tableConfig", "formConfig", "dataSource"]);
const emit = defineEmits(["reload"]);
const initFormData = (
  { fields }: { fields: any[] },
  defaultData: { [key: string]: any }
) => {
  const form: any = {};
  fields.forEach((i: any) => {
    form[i.prop] = defaultData[i.prop] || "";
  });
  return form;
};
const form = ref<any>(props.formConfig.form);
const isModelVisible = ref<boolean>(false);
const searchForm: any = ref(
  initFormData(props.tableConfig.search, route.query)
);
const exportToCsv = useExport();
const checkedColumns = ref<string[]>(
  props.tableConfig.columns.map((i: ObjProps) => i.prop)
);
const filterColumns = computed(() => {
  return props.tableConfig.columns.filter(
    (i: ObjProps) => i.prop !== "operation"
  );
});
const computedColumns = computed(() => {
  return props.tableConfig.columns.filter(
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
const onSearch = async (query: ObjProps) => {
  const { path } = route;
  try {
    router.push({
      path,
      query,
    });
  } catch (error) {
    console.log(error);
  }
};
const onReset = () => {
  const { path } = route;
  router.push({
    path,
    query: {},
  });
};
const onExport = () => {
  // exportToCsv(props.dataSource.result, "title");
};
const onAdd = () => {
  form.value = {};
  isModelVisible.value = true;
};
const onEdit = (item: any) => {
  form.value = item;
  isModelVisible.value = true;
};
const onView = (item: any) => {
  form.value = item;
  isModelVisible.value = true;
};
const onDel = (item: any) => {
  form.value = item;
  isModelVisible.value = true;
};
const onSave = (item: any) => {
  console.log(item);
  emit("reload");
  isModelVisible.value = false;
};
defineExpose({
  onAdd,
  onSave,
  onEdit,
  onView,
  onDel,
  isModelVisible,
});
</script>
<template>
  <div class="vd-list">
    <div
      class="vd-list-bar flex md:flex-row flex-col md:mb-0 mb-4 justify-between"
    >
      <div class="vd-search">
        <vd-search
          :config="tableConfig.search"
          :form="searchForm"
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
    <vd-card v-loading="dataSource.loading">
      <vd-table
        :columns="computedColumns"
        :dataSource="dataSource.result"
        class="mb-6"
      >
        <template v-for="(index, name) in $slots" #[name]="{ row }">
          <slot :name="name" :row="row"></slot>
        </template>
      </vd-table>
      <vd-pagination
        @onPageChange="onPageChange"
        :pageInfo="dataSource.pageInfo"
      />
    </vd-card>
  </div>
  <slot name="view" :form="form" :rules="formConfig.rules"></slot>
</template>
