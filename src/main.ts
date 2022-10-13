import { createApp, createVNode } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import i18next from "i18next";
import I18NextVue from "i18next-vue";

import App from "@/App.vue";
import "@/router/permission";
import "@/mock";
import "@/assets/main.scss";

import directives from "@/directives";

const locales = {
  en: {
    hello: "Hello!",
    loadbundle: "Load bundle language: {{lang}}",
  },
  zh: {
    hello: "你好!",
    loadbundle: "Load bundle language: {{lang}}",
  },
};

i18next.init({
  lng: "zh",
  fallbackLng: "zh",
  resources: {
    en: { translation: locales.en },
    zh: { translation: locales.zh },
  },
});

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
