<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { ref } from "vue";
const optionPie = ref<EChartsOption>({
  title: {
    text: "Sales Data",
    // left: "center",
  },
  grid: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    bottom: 0,
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
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
</script>
<template>
  <vd-chart autoresize class="h-[340px]" :option="optionPie" />
</template>
