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
      <el-table-column prop="id"  width="80" :label="$t('tableTitle.id')" />
      <el-table-column prop="avatar" width="200" :label="$t('tableTitle.avatar')">
        <template #default="{ row }">
          <img :src="row.avatar" class="w-10 h-10 rounded" />
        </template>
      </el-table-column>
      <el-table-column prop="username" width="200" :label="$t('tableTitle.username')" />
      <el-table-column prop="roles" :label="$t('tableTitle.roles')">
        <template #default="{ row }">
          <el-tag
            :key="item"
            class="mx-1"
            round
            effect="dark"
            v-for="item in row.roles"
          >
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" :label="$t('tableTitle.email')" />
      <el-table-column width="200px" :label="$t('tableTitle.operation')">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)" type="primary" round>
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
  <UsersView @reload="reload" ref="viewRef" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useList, useExport } from "@/utils";
import UsersView from "./UsersView.vue";
const { data, reload } = useList("/users");
const { onExport } = useExport();
const viewRef = ref<InstanceType<typeof UsersView> | null>(null);
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

const handleEdit = (row: any) => {
  viewRef.value?.showForm(row);
};

const handleDel = (row: any) => {};

const handleExport = () => {
  onExport(data.value.result, "title");
};
</script>
