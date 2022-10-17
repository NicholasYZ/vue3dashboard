<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { ref, onMounted } from "vue";
import { getList } from "@/api";
import VChart from "@/utils/charts";

const optionLine = ref<EChartsOption>({
  grid: {
    bottom: "25px",
    left: "30px",
    right: "0",
  },
  title: {
    text: "Sales Data",
    // left: "center",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [10, 230, 224, 618, 135, 147, 760],
      type: "line",
    },
  ],
});

const optionPie = ref<EChartsOption>({
  title: {
    text: "Sales Data",
    // left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    left: "center",
    top: "bottom",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["25%", "55%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "14",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
});

const optionBar = ref<EChartsOption>({
  grid: {
    bottom: "25px",
    left: "30px",
    right: "0",
  },
  title: {
    text: "Weekday",
    // left: "center",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
});

const columns = ["id", "name", "color", "pantone_value", "year"];

let dataSource = ref<any[]>([]);

const getData = async (num: number) => {
  const { data } = await getList(num);
  dataSource.value = data;
};

onMounted(async () => {
  getData(1);
});
</script>
<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-4 text-sm mb-4"
  >
    <div class="bg-[#fff] rounded-md px-6 py-5 hover:bg-gray-50">
      <vd-statistic
        title="Total Orders"
        color="#ec6769"
        icon="ShoppingCartFull"
        num="611"
      />
    </div>
    <div class="bg-[#fff] rounded-md px-6 py-5 hover:bg-gray-50">
      <vd-statistic
        title="Total Expenses"
        color="#fedb6a"
        icon="WalletFilled"
        num="355"
      />
    </div>
    <div class="bg-[#fff] rounded-md px-6 py-5 hover:bg-gray-50">
      <vd-statistic
        title="Total Profit"
        color="#95cb72"
        icon="Money"
        num="5655"
      />
    </div>
    <div class="bg-[#fff] rounded-md px-6 py-5 hover:bg-gray-50">
      <vd-statistic
        title="Total Vistors"
        color="#5976cb"
        icon="UserFilled"
        num="848"
      />
    </div>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 text-sm mb-4"
  >
    <div class="bg-[#fff] h-[340px] rounded-md p-6">
      <v-chart autoresize :option="optionBar" />
    </div>

    <div class="bg-[#fff] h-[340px] rounded-md p-6">
      <v-chart autoresize :option="optionPie" />
    </div>

    <div class="bg-[#fff] h-[340px] rounded-md p-6">
      <v-chart autoresize :option="optionLine" />
    </div>
  </div>

  <div class="bg-[#fff] rounded-md p-6">
    <h2 class="text-xl mb-4 text-slate-600 leading-none">Records</h2>
    <vd-table :columns="columns" :dataSource="dataSource" />
  </div>
</template>

<style></style>
