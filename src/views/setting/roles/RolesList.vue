<template>
  <vd-list-bar>
    <template #list-bar-left>
      <vd-search :config="config.search" />
    </template>
    <template #list-bar-right>
      <div class="flex md:justify-end justify-center items-center mb-4">
        <vd-icon-box icon="Plus" @click="handleAdd" />
        <vd-icon-box icon="Download" @click="handleExport" />
      </div>
    </template>
  </vd-list-bar>
  <vd-card v-loading="data.loading">
    <el-table
      stripe
      size="large"
      header-row-class-name="text-slate-900 capitalize text-center"
      selection
      row-key="id"
      :data="data.result"
      class="mb-6"
    >
      <el-table-column prop="id" :label="$t('tableTitle.id')" />
      <el-table-column prop="type" :label="$t('tableTitle.type')" />
      <el-table-column width="200px" :label="$t('tableTitle.operation')">
        <template #default="{ row }">
          <el-button size="small" @click="handleView(row)" type="primary" round>
            {{ $t("view") }}
          </el-button>
          <el-button size="small" @click="handleEdit(row)" type="success" round>
            {{ $t("edit") }}
          </el-button>
          <el-button size="small" @click="handleDel(row)" type="danger" round>
            {{ $t("del") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <vd-pagination :pageInfo="data.pageInfo" />
  </vd-card>
  <RolesView @reload="reload" ref="viewRef" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useList, useExport } from "@/hooks";
import RolesView from "./RolesView.vue";
const { data, reload } = useList("/roles");
const { onExport } = useExport();
const viewRef = ref<InstanceType<typeof RolesView> | null>(null);
const config = {
  search: [
    {
      name: "username",
      prop: "username",
      placeholder: "UserName",
      type: "text",
    },
    {
      name: "city",
      prop: "city",
      placeholder: "city",
      type: "select",
      dict: { "1": "beijing", "2": "shanghai", "3": "guangzhou" },
    },
  ],
};
const handleAdd = () => {
  viewRef.value?.showForm();
};

const handleView = (row: any) => {
  viewRef.value?.showForm(row, "view");
};

const handleEdit = (row: any) => {
  viewRef.value?.showForm(row, "edit");
};

const handleDel = (row: any) => {};

const handleExport = () => {
  onExport(data.value.result, "title");
};
</script>
