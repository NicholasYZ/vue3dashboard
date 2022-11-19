import { createVNode } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import type { App } from "vue";
type Module = { [key: string]: any };

const COMS: Record<string, Module> = import.meta.glob("./*.vue");

export default {
  install(Vue: App) {
    Object.keys(COMS).forEach((key) => {
      //匹配.vue结尾的文件名
      const match: RegExpMatchArray | null = key.match(/[\w]+(?=.vue)/);
      if (!match) return;
      //组件名
      const name: string = match[0];
      //组件实例
      const component: Module = COMS[key].default;
      //全局注册
      Vue.component(`vd-${name}`, component);
    });

    // 注册所有Element Icon
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      Vue.component(key, component);
    }

    // 创建Icon组件
    const Icon = (props: { icon: string }) => {
      const { icon } = props;
      return createVNode(
        ElementPlusIconsVue[icon as keyof typeof ElementPlusIconsVue]
      );
    };
    Vue.component("vd-icon", Icon);
  },
};
