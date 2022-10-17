<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ExportToCsv } from "export-to-csv";
import { getList } from "@/api";
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
  // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};

defineProps(["config"]);

let loading = ref<boolean>(false);
let dataSource = ref<any[]>([]);
let pageInfo = ref<{ [key: string]: number }>({
  page: 1,
  per_page: 10,
  total: 0,
  total_pages: 0,
});

const getData = async (num: number) => {
  loading.value = true;
  const { data, page, per_page, total, total_pages } = await getList(num);
  dataSource.value = data;
  loading.value = false;
  pageInfo.value = {
    page,
    per_page,
    total,
    total_pages,
  };
};

const onPageChange = (num: number) => {
  getData(num);
};

onMounted(async () => {
  getData(1);
});

const onSearch = (keywords: string) => {
  console.log(keywords);
};

const onExportToCsv = () => {
  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(dataSource.value);
};
const onCreate = () => {
  console.log("create");
};
</script>
<template>
  <div v-loading="loading" class="vd-list">
    <div
      class="vd-list-bar flex md:flex-row flex-col md:mb-0 mb-4 justify-between"
    >
      <vd-search :config="config.search" @onSearch="onSearch" />
      <p class="flex md:justify-end justify-center">
        <el-button size="large" @click="onCreate" type="primary">
          {{ $t("create") }}
        </el-button>
        <el-button size="large" @click="onExportToCsv" type="primary">
          {{ $t("export") }}
        </el-button>
      </p>
    </div>
    <vd-table :columns="config.columns" :dataSource="dataSource" class="mb-4" />
    <vd-pagination @onPageChange="onPageChange" :pageInfo="pageInfo" />
  </div>
</template>
