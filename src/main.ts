import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "virtual:svg-icons-register";

import { I18NextVue, i18next } from "@/i18n";
import directives from "@/directives";
import components from "@/components";
import router from "@/router";
import "element-plus/dist/index.css";
import "@/assets/main.scss";
import App from "@/App.vue";

const app = createApp(App);

app.use(I18NextVue, { i18next });
app.use(directives); // 调用安装自定义指令
app.use(components); // 调用安装自定义组件
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount("#app");
