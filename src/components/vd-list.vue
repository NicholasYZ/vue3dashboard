<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import { ExportToCsv } from "export-to-csv";
import type { FormInstance } from "element-plus";
import { getList } from "@/api";
import { sleep } from "@/utils";

interface ObjProps {
  [key: string]: any;
}

const options = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  showTitle: true,
  title: "My Awesome CSV",
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
};

const isAddFormVisable = ref<boolean>(false);
const props = defineProps(["config"]);
const keywords = ref<ObjProps>({});
const loading = ref<boolean>(false);
const dataSource = ref<any[]>([]);
const pageInfo = ref<ObjProps>({
  page: 1,
  per_page: 10,
  total: 0,
  total_pages: 0,
});
const form = ref<ObjProps>(props.config.form);
const checkedColumns = ref<string[]>(
  props.config.columns.map((i: ObjProps) => i.prop)
);

const columns = computed(() => {
  return props.config.columns.filter(
    (i: ObjProps) => checkedColumns.value.indexOf(i.prop) > -1
  );
});

const getParams = () => {
  const { page, per_page } = pageInfo.value;
  return {
    page,
    per_page,
    ...keywords.value,
  };
};

const getData = async () => {
  loading.value = true;
  const params = getParams();
  const { data, page, per_page, total, total_pages } = await getList({
    url: props.config.url || "/products",
    params,
  });
  dataSource.value = data;
  loading.value = false;
  pageInfo.value = {
    page,
    per_page,
    total,
    total_pages,
  };
};

const onPageChange = (page: number) => {
  pageInfo.value.page = page;
  getData();
};

const onSearch = async (
  formEl: FormInstance | undefined,
  form: { [key: string]: any }
) => {
  if (!formEl) return;
  loading.value = true;
  try {
    await formEl.validate();
    await sleep(200);
    keywords.value = form;
    pageInfo.value.page = 1;
    getData();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const onExportToCsv = () => {
  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(dataSource.value);
};

const onSave = async (
  formEl: FormInstance | undefined,
  form: { [key: string]: any }
) => {
  if (!formEl) return;
  console.log(form);
  isAddFormVisable.value = false;
};

const onAdd = () => {
  isAddFormVisable.value = true;
};

const onEdit = (item: ObjProps) => {
  isAddFormVisable.value = true;
  const fields = form.value.fields.map((i: ObjProps) => {
    return {
      ...i,
      value: item[i.prop],
    };
  });
  form.value.fields = fields;
  console.log(form.value)
};

onMounted(async () => {
  getData();
});
</script>
<template>
  <div v-loading="loading" class="vd-list">
    <div
      class="vd-list-bar flex md:flex-row flex-col md:mb-0 mb-4 justify-between"
    >
      <div class="vd-search">
        <vd-form
          :config="config.search"
          :hasSubmit="true"
          @formSubmit="onSearch"
        />
      </div>
      <div class="flex md:justify-end justify-center">
        <el-popover trigger="hover">
          <template #reference>
            <el-button
              size="large"
              auto-insert-space
              type="primary"
              icon="Filter"
              circle
            />
          </template>
          <el-checkbox-group v-model="checkedColumns">
            <el-checkbox
              v-for="item in config.columns"
              :key="item.prop"
              :label="item.prop"
            />
          </el-checkbox-group>
        </el-popover>

        <el-button
          size="large"
          auto-insert-space
          icon="Plus"
          @click="isAddFormVisable = true"
          type="primary"
          circle
        />
        <el-button
          size="large"
          icon="Download"
          auto-insert-space
          @click="onExportToCsv"
          type="primary"
          circle
        />
      </div>
    </div>
    <el-dialog :title="$t('create')" v-model="isAddFormVisable">
      <vd-form :hasSubmit="true" @formSubmit="onSave" :config="form" />
    </el-dialog>
    <vd-table
      :columns="columns"
      :dataSource="dataSource"
      @edit="onEdit"
      @add="onAdd"
      class="mb-4"
    />
    <vd-pagination @onPageChange="onPageChange" :pageInfo="pageInfo" />
  </div>
</template>
