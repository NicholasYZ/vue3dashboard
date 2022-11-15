<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { ref } from "vue";
import { useList } from "@/hooks";
const { data, reload } = useList("/products");
const columns = [
  {
    prop: "id",
  },
  {
    prop: "name",
  },
  {
    prop: "color",
  },
  {
    prop: "pantone_value",
  },
  {
    prop: "year",
  },
];

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
</script>
<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-6 text-sm mb-6"
  >
    <vd-statistic
      title="Total Orders"
      color="#ec6769"
      icon="ShoppingCartFull"
      num="611"
      class="hover:shadow-lg transition-shadow duration-500"
    />
    <vd-statistic
      title="Total Expenses"
      color="#fedb6a"
      icon="WalletFilled"
      num="355"
      class="hover:shadow-lg transition-shadow duration-500"
    />
    <vd-statistic
      title="Total Profit"
      color="#95cb72"
      icon="Money"
      num="5655"
      class="hover:shadow-lg transition-shadow duration-500"
    />
    <vd-statistic
      title="Total Vistors"
      color="#5976cb"
      icon="UserFilled"
      num="848"
      class="hover:shadow-lg transition-shadow duration-500"
    />
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6 text-sm mb-6"
  >
    <vd-chart class="h-[340px]" autoresize :option="optionBar" />
    <vd-chart class="h-[340px]" autoresize :option="optionPie" />
    <vd-chart class="h-[340px]" autoresize :option="optionLine" />
  </div>

  <vd-simple-table title="Records" :columns="columns" :data="data" />
</template>

<style></style>
