<script setup lang="ts">
import { useRouterStore } from "@/store";
const { router } = useRouterStore();
const getMenuItem = (menus: any) => {
  return menus.map(({ name, meta, path, children }: any) => {
    const item: any = {
      name,
      path,
      title: name,
      icon: meta.icon,
      permissions: meta.permissions,
    };
    if (children) {
      item.children = getMenuItem(children);
    }
    return item;
  });
};
const dataSource = getMenuItem(router);
const columns = [
  {
    prop: "name",
  },
  {
    prop: "path",
  },
  {
    prop: "permissions",
  },
  {
    prop: "icon",
  },
  {
    prop: "operation",
  },
];
</script>
<template>
  <vd-card>
    <vd-table :columns="columns" :dataSource="dataSource">
      <template #operation>
        <el-button size="small" type="success" round>
          {{ $t("view") }}
        </el-button>
        <el-button size="small" type="primary" round>
          {{ $t("view") }}
        </el-button>
        <el-button size="small" type="danger" round>
          {{ $t("del") }}
        </el-button>
      </template>
      <template #icon="scope">
        <el-icon>
          <Icon :icon="scope.row.icon" />
        </el-icon>
      </template>
      <template #name="scope">
        {{ $t(scope.row.name) }}
      </template>
    </vd-table>
  </vd-card>
</template>
