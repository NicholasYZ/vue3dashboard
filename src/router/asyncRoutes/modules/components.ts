import type { RouteRecordRaw } from "vue-router";
import Layout from "@/views/layouts/BaseLayout.vue";

const componentsRoutes: RouteRecordRaw = {
  name: "components",
  path: "/components",
  component: Layout,
  redirect: "/components/list",
  meta: {
    title: "组件",
    icon: "Operation",
  },
  children: [
    {
      name: "components.list",
      path: "/components/list",
      component: import("@/views/components/ListView.vue"),
      meta: {
        title: "列表",
        icon: "List",
      },
    },
    {
      name: "components.form",
      path: "/components/form",
      component: import("@/views/components/FormView.vue"),
      meta: {
        title: "表单",
        icon: "DocumentCopy",
      },
    },
    {
      name: "components.charts",
      path: "/components/charts",
      component: import("@/views/components/ChartsView.vue"),
      meta: {
        title: "表单",
        icon: "DocumentCopy",
      },
    },
    {
      name: "components.icons",
      path: "/components/icons",
      component: import("@/views/components/IconsView.vue"),
      meta: {
        title: "表单",
        icon: "DocumentCopy",
      },
    },
    {
      name: "components.editor",
      path: "/components/editor",
      component: import("@/views/components/EditorView.vue"),
      meta: {
        title: "富文本编辑器",
        icon: "DocumentCopy",
      },
    },
  ],
};

export default componentsRoutes;
