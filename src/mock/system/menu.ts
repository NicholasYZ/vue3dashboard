export const menu = [
  {
    id: 1,
    name: "components.index",
    path: "/components",
    component: "layouts/BaseLayout",
    redirect: "/components/list",
    meta: {
      title: "组件",
      icon: "Operation",
    },
    children: [
      {
        id: 11,
        name: "components.list",
        path: "/components/list",
        component: "components/ListView",
        meta: {
          title: "列表",
          icon: "List",
        },
      },
      {
        id: 12,
        name: "components.form",
        path: "/components/form",
        component: "components/FormView",
        meta: {
          title: "表单",
          icon: "DocumentCopy",
        },
      },
      {
        id: 13,
        name: "components.charts",
        path: "/components/charts",
        component: "components/ChartsView",
        meta: {
          title: "图表",
          icon: "DocumentCopy",
        },
      },
      {
        id: 15,
        name: "components.statistic",
        path: "/components/statistic",
        component: "components/StatisticView",
        meta: {
          title: "富文本编辑器",
          icon: "DocumentCopy",
        },
      },
      {
        id: 14,
        name: "components.icons",
        path: "/components/icons",
        component: "components/IconsView",
        meta: {
          title: "表单",
          icon: "DocumentCopy",
        },
      },
      {
        id: 16,
        name: "components.editor",
        path: "/components/editor",
        component: "components/EditorView",
        meta: {
          title: "富文本编辑器",
          icon: "DocumentCopy",
        },
      },
    ],
  },
  {
    id: 2,
    name: "setting.index",
    path: "/setting",
    component: "layouts/BaseLayout",
    redirect: "/setting/info",
    meta: {
      title: "设置",
      icon: "Setting",
    },
    children: [
      {
        id: 21,
        name: "setting.info",
        path: "/setting/info",
        component: "setting/InfoView",
        meta: {
          title: "个人中心",
          icon: "User",
        },
      },
      {
        id: 22,
        name: "setting.roles",
        path: "/setting/roles",
        component: "setting/roles/RolesList",
        meta: {
          title: "角色管理",
          icon: "Monitor",
        },
      },
      {
        id: 23,
        name: "setting.menu",
        path: "/setting/menu",
        component: "setting/menu/MenuList",
        meta: {
          title: "菜单管理",
          icon: "Menu",
        },
      },
      {
        id: 24,
        name: "setting.users",
        path: "/setting/users",
        component: "setting/users/UsersList",
        meta: {
          title: "用户管理",
          icon: "Avatar",
        },
      },
      {
        id: 25,
        name: "setting.system",
        path: "/setting/system",
        component: "setting/SystemView",
        meta: {
          title: "系统管理",
          icon: "Setting",
        },
      },
    ],
  },
  {
    id: 3,
    name: "pages.index",
    path: "/pages",
    component: "layouts/BaseLayout",
    redirect: "/pages/info",
    meta: {
      title: "页面",
      icon: "Setting",
    },
    children: [
      {
        id: 31,
        name: "pages.price",
        path: "/pages/price",
        component: "pages/PriceView",
        meta: {
          title: "价签",
          icon: "PriceTag",
        },
      },
    ],
  },
];
