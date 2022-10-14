<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { ref, onMounted } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const optionPie = ref<EChartsOption>({
  title: {
    text: "Traffic Sources",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  // legend: {
  //   orient: "vertical",
  //   left: "left",
  //   data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
  // },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "Direct" },
        { value: 310, name: "Email" },
        { value: 234, name: "Ad Networks" },
        { value: 135, name: "Video Ads" },
        { value: 348, name: "Search Engines" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

const optionLine = ref<EChartsOption>({
  title: {
    text: "Sales Data",
    left: "center",
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
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
});

const optionBar = ref<EChartsOption>({
  title: {
    text: "Weekday",
    left: "center",
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
  <main>
    <div
      class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 text-sm"
    >
      <div class="bg-[#fff] h-[340px] rounded-md py-6 px-8">
        <v-chart autoresize :option="optionBar" />
      </div>

      <div class="bg-[#fff] h-[340px] rounded-md py-6 px-8">
        <v-chart autoresize :option="optionPie" />
      </div>

      <div class="bg-[#fff] h-[340px] rounded-md py-6 px-8">
        <v-chart autoresize :option="optionLine" />
      </div>
    </div>
  </main>
</template>

<style></style>
