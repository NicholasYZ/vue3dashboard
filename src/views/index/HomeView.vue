<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { ref, onMounted } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const option = ref<EChartsOption>({
  title: {
    text: "Traffic Sources",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
  },
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
        { value: 1548, name: "Search Engines" },
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

const config = {
  url: "",
  title: "Form 表单",
  fields: [
    {
      prop: "username",
      title: "用户名",
      placeholder: "UserName",
      rules: [{ required: true }],
    },
    {
      prop: "password",
      title: "密码",
      placeholder: "PassWord",
      rules: [{ required: true }],
    },
  ],
};
</script>
<template>
  <main>
    <!-- <vd-card title="hello" /> -->
    <div
      class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 text-sm"
    >
      <div class="bg-[#fff] rounded-md py-6 px-8">
        <vd-form :config="config"></vd-form>
      </div>

      <div class="bg-[#fff] min-h-[200px] rounded-md py-6 px-8">
        <v-chart autoresize :option="option" />
      </div>

      <div class="bg-[#fff] min-h-[200px] rounded-md py-6 px-8">
        <v-chart autoresize :option="option" />
      </div>
    </div>
  </main>
</template>

<style></style>
