<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { ref } from "vue";

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
</script>
<template>
  <main>
    <!-- <vd-card title="hello" /> -->
    <div
      class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-4 text-sm"
    >
      <div class="bg-gray-50 rounded-md p-8">
        <vd-form url="" title="提交"></vd-form>
      </div>

      <div class="bg-gray-50 rounded-md p-8">
        <v-chart class="chart" :option="option" />
      </div>

      <div class="bg-gray-50 rounded-md p-8">
        <v-chart class="chart" :option="option" />
      </div>
    </div>
  </main>
</template>

<style></style>
