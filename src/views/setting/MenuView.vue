<script setup lang="ts">
import { useRouterStore } from "@/store";
const { router } = useRouterStore();
const getMenuItem = (menus: any) => {
  return menus.map(({ name, meta, path, children }: any) => {
    const item: any = {
      name,
      path,
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
const columns = ["name", "path", "permissions", "icon", "operation"];
</script>
<template>
  <vd-card>
    <el-table
      selection
      stripe
      size="large"
      header-row-class-name="text-slate-900 capitalize text-center"
      :data="dataSource"
      row-key="name"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        v-for="item in columns"
        :key="item"
        :prop="item"
        :label="$t(item)"
      >
        <template #default="scope">
          <el-icon v-if="item === 'icon'">
            <Icon :icon="scope.row.icon" />
          </el-icon>
          <span v-else-if="item === 'operation'">
            <el-button size="small" type="success" round>
              {{ $t("view") }}
            </el-button>
            <el-button size="small" type="primary" round>
              {{ $t("view") }}
            </el-button>
            <el-button size="small" type="danger" round>
              {{ $t("del") }}
            </el-button>
          </span>
          <span v-else-if="item === 'name'">
            {{ $t(scope.row.name) }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </vd-card>
</template>
