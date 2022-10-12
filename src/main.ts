import { createApp, createVNode } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";

import ElementPlus from "element-plus";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ECharts from "vue-echarts";

import "@/router/permission";
import "@/mock";
import "@/assets/main.scss";
import "@/components";

import directives from "@/directives";

const app = createApp(App);

app.use(directives); // 调用安装指令
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 创建Icon组件
const Icon = (props: { icon: string }) => {
  const { icon } = props;
  return createVNode(
    ElementPlusIconsVue[icon as keyof typeof ElementPlusIconsVue]
  );
};
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
// 注册Icon组件
// eslint-disable-next-line vue/multi-word-component-names
app.component("Icon", Icon);
app.component("v-chart", ECharts);

app.mount("#app");
