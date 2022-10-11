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
      Vue.component(name, component);
    });
  },
};
