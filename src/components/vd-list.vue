<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ExportToCsv } from "export-to-csv";
import type { FormInstance } from "element-plus";
import { getList } from "@/api";
import { sleep } from "@/utils";

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

const props = defineProps(["config"]);
const keywords = ref<{ [key: string]: any }>({});
const loading = ref<boolean>(false);
const dataSource = ref<any[]>([]);
const pageInfo = ref<{ [key: string]: number }>({
  page: 1,
  per_page: 10,
  total: 0,
  total_pages: 0,
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

const onCreate = () => {
  console.log("create");
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
        <el-button size="large" @click="onCreate" type="primary">
          {{ $t("create") }}
        </el-button>
        <el-button size="large" @click="onExportToCsv" type="primary">
          {{ $t("export") }}
        </el-button>
      </div>
    </div>
    <vd-table :columns="config.columns" :dataSource="dataSource" class="mb-4" />
    <vd-pagination @onPageChange="onPageChange" :pageInfo="pageInfo" />
  </div>
</template>
