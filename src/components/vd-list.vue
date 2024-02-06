<template>
  <vd-card class="bg-white">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl text-slate-600 leading-none">{{ title }}</h2>
      <div class="flex">
        <slot name="list-bar-right">
          <el-button
            v-if="!noAdd"
            round
            type="primary"
            @click="onAdd"
            icon="Plus"
          >
            新建
          </el-button>
          <!-- <vd-icon-box v-if="!noAdd" @click="onAdd" icon="Plus" class="mr-2" /> -->
          <!-- <vd-icon-box icon="Download" @click="onExport(data.result, 'title')" /> -->
        </slot>
      </div>
    </div>
    <div
      class="flex bg-white flex-col justify-between px-4 py-4 rounded vd-list border-t border-gray-100"
    >
      <vd-search :config="search" />
    </div>

    <slot name="list-top-content"></slot>

    <vd-table
      :columns="columns"
      :dataSource="data.result"
      :loading="data.loading"
      :dict="data.dict"
      @selection-change="onSelectionChange"
      @current-change="onCurrentChange"
    >
      <template v-for="(index, name) in $slots" v-slot:[name]="{ row, dict }">
        <slot :name="name" :dict="dict" :row="row"></slot>
      </template>
      <template #operation="{ row, item: { types = ['view', 'edit', 'del'] } }">
        <el-button
          v-if="types.indexOf('view') > -1"
          size="small"
          @click="onView(row)"
          type="primary"
          auto-insert-space
          icon="View"
          round
        >
          查看
        </el-button>
        <el-button
          v-if="types.indexOf('edit') > -1"
          size="small"
          @click="onEdit(row)"
          type="success"
          auto-insert-space
          round
          icon="Edit"
        >
          编辑
        </el-button>
        <el-popconfirm
          v-if="types.indexOf('del') > -1"
          @confirm="onDel(row)"
          title="确认删除?"
        >
          <template #reference>
            <el-button
              size="small"
              round
              type="danger"
              icon="Delete"
              auto-insert-space
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </vd-table>
    <vd-pagination :pageInfo="data.pageInfo" />
  </vd-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, type Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useExport } from "@/hooks";
import { del, get } from "@/utils";

const emit = defineEmits(["selection-change", "current-change", "refresh"]);

const isShowSearch = ref<any>(false);

type resProps = {
  result: any[];
  loading: boolean;
  dict: { [key: string]: any },
  pageInfo: {
    [key: string]: any;
  };
};

const data = ref<resProps>({
  result: [],
  loading: true,
  dict: {},
  pageInfo: {
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  },
});

const props = defineProps([
  "methods",
  "columns",
  "search",
  "title",
  "url",
  "noAdd",
]);
const router = useRouter();
const route = useRoute();
const url = props.url || route.matched[0].path;
const { onExport } = useExport();

const selectedIds = ref<any[]>([]);

const query: Ref<any> = computed(() => {
  return route.query;
});

onMounted(async () => {
  await getData();
});

const onSelectionChange = (selection: any) => {
  selectedIds.value = selection.map((item: any) => item.id);
  console.log(selectedIds.value);
  emit("selection-change", selectedIds.value);
};

const onCurrentChange = (page: any) => {
  emit("current-change", page);
};

const beforeRender = (data: any) => {
  if (props.methods && props.methods.beforeRender) {
    return props.methods.beforeRender(data);
  }
  return data;
};

const getData = async () => {
  const { result, pageInfo, dict = {} } = await get(url, query.value);
  data.value = await beforeRender({
    result,
    loading: false,
    pageInfo,
    dict,
  });
};

const onAdd = () => {
  router.push(`${url}/add`);
};

const onView = ({ id }: any) => {
  router.push(`${url}/view/${id}`);
};

const onEdit = ({ id }: any) => {
  router.push(`${url}/edit/${id}`);
};

const onDel = async ({ id }: any) => {
  await del(`${url}/${id}`);
  data.value.loading = true;
  await getData();
};

const onToggleSearch = () => {
  isShowSearch.value = !isShowSearch.value;
};

defineExpose({ refresh: getData, onDel });
</script>
