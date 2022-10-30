<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { FormInstance } from "element-plus";
import Qs from "qs";
import { i18next } from "@/i18n";
import { sleep, useQuery, useExport } from "@/utils";
import type { ObjProps } from "@/types";
import { useSettingStore } from "@/store";

const { setting } = useSettingStore();
const router = useRouter();
const route = useRoute();
const exportToCsv = useExport();

const { config, updateFields } = inject<any>("config");

const url = computed(() => {
  return `/products?${Qs.stringify(route.query)}`;
});

const { res, reload } = useQuery(url);

const initFormData = (item: any) => {
  const { title, fields, inline } = item;
  const rules: ObjProps = {};
  const form: ObjProps = {};
  fields.forEach((i: any) => {
    rules[i.prop] = i.rules || [];
    form[i.prop] = i.value || "";
  });
  return {
    title,
    rules,
    fields,
    inline,
  };
};

const addConfig = initFormData(config.value.form);
const searchConfig = initFormData(config.value.search);

const isAddFormVisable = ref<boolean>(false);

const checkedColumns = ref<string[]>(
  config.value.columns.map((i: ObjProps) => i.prop)
);

const columns = computed(() => {
  return config.value.columns.filter(
    (i: ObjProps) => checkedColumns.value.indexOf(i.prop) > -1
  );
});

const onPageChange = (page: number) => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      page,
    },
  });
};

const onSearch = async (
  formEl: FormInstance | undefined,
  query: { [key: string]: any }
) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    await sleep(200);
    router.push({
      path: "/components/list",
      query,
    });
  } catch (error) {
    console.log(error);
  }
};

const onExport = () => {
  const title = i18next.t(route.name as string);
  exportToCsv(res.value.result, title);
};

const onSave = (
  formEl: FormInstance | undefined,
  form: { [key: string]: any }
) => {
  if (!formEl) return;
  isAddFormVisable.value = false;
  reload();
};

const onAdd = () => {
  updateFields(undefined, "form");
  isAddFormVisable.value = true;
};

const onEdit = (form: ObjProps) => {
  updateFields(form, "form");
  isAddFormVisable.value = true;
};

const onDel = (form: ObjProps) => {
  console.log("del");
};

const onView = (form: ObjProps) => {
  updateFields(form, "form");
  isAddFormVisable.value = true;
};

const onCancel = () => {
  isAddFormVisable.value = false;
};

const onReset = () => {};

const onSwitch = (form: ObjProps, type: string) => {};
</script>
<template>
  <div class="vd-list">
    <div
      class="vd-list-bar flex md:flex-row flex-col md:mb-0 mb-4 justify-between"
    >
      <div class="vd-search">
        <vd-form
          :config="searchConfig"
          :hasReset="true"
          :hasSubmit="true"
          @formSubmit="onSearch"
        />
      </div>
      <div class="flex md:justify-end justify-center items-center mb-4">
        <el-popover trigger="hover">
          <template #reference>
            <vd-pill>
              <Icon icon="Filter" />
            </vd-pill>
          </template>
          <el-checkbox-group v-model="checkedColumns">
            <el-checkbox
              v-for="item in config.columns"
              :key="item.prop"
              :disabled="item.prop === 'operation' || item.prop === 'id'"
              :label="item.prop"
            />
          </el-checkbox-group>
        </el-popover>
        <vd-pill @click="onAdd">
          <Icon icon="Plus" />
        </vd-pill>
        <vd-pill @click="onExport">
          <Icon icon="Download" />
        </vd-pill>
      </div>
    </div>
    <el-dialog
      @closed="onCancel"
      destroy-on-close
      :fullscreen="setting.deviceType === 'mobile'"
      :title="$t('create')"
      v-model="isAddFormVisable"
    >
      <vd-form
        :hasSubmit="true"
        @reset="onReset"
        @cancel="onCancel"
        @formSubmit="onSave"
        :config="addConfig"
      />
    </el-dialog>
    <vd-card v-loading="res.loading">
      <vd-table
        :columns="columns"
        :dataSource="res.result"
        @edit="onEdit"
        @add="onAdd"
        @del="onDel"
        @view="onView"
        @switch="onSwitch"
        class="mb-6"
      />
      <vd-pagination @onPageChange="onPageChange" :pageInfo="res.pageInfo" />
    </vd-card>
  </div>
</template>
