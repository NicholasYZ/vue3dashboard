import { createApp, createVNode } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { I18NextVue, i18next } from "@/i18n";
import "element-plus/dist/index.css";
import "virtual:svg-icons-register";
import App from "@/App.vue";
import "@/mock";
import "@/assets/main.scss";

import directives from "@/directives";

const app = createApp(App);

app.use(I18NextVue, { i18next });
app.use(directives); // 调用安装指令
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

import "@/components";

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

// 注册Icon组件
// eslint-disable-next-line vue/multi-word-component-names
app.component("Icon", Icon);

app.mount("#app");

// import VueGtag from "vue-gtag";
// app.use(
//   VueGtag,
//   {
//     config: { id: "G-FB8YMFEX89" },
//   },
//   router
// );
