import type { App } from "vue";
import permissions from "./permissions";
import type { ObjectDirective } from "vue";

interface directiveProps {
  [key: string]: ObjectDirective;
}

const directives: directiveProps = {
  permissions,
};

export default {
  install(Vue: App) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
