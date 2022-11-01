<script setup lang="tsx">
import { getRoles } from "@/api";
import { onMounted, ref } from "vue";

const dataSource = ref<any>([]);
const columns = ref<string[]>(["id", "type", "operation"]);

onMounted(async () => {
  const res = await getRoles();
  console.log(res)
  dataSource.value = res;
});
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
        <template v-if="item === 'operation'" #default>
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
      </el-table-column>
    </el-table>
  </vd-card>
</template>
