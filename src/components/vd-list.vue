<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { getList } from "@/api";
defineProps(["columns"]);

let loading = ref<boolean>(false);
let dataSource = ref<any[]>([]);
let pageInfo = ref<{ [key: string]: number }>({
  page: 1,
  per_page: 10,
  total: 0,
  total_pages: 0,
});
onMounted(async () => {
  getData(1);
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
}

const onPageChange = (num: number) => {
  console.log(num)
  getData(num);
};
</script>
<template>
  <div class="vd-list">
    <vd-table
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      class="mb-4"
    ></vd-table>
    <vd-pagination
      @onPageChange="onPageChange"
      :pageInfo="pageInfo"
    ></vd-pagination>
  </div>
</template>
