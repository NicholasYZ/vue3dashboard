import { watch, ref, isRef, computed } from "vue";
import { useRoute } from "vue-router";
import Qs from "qs";
import { sleep } from "@/utils";
import { getList } from "@/api";

type resProps = {
  result: any[];
  loading: boolean;
  pageInfo: {
    [key: string]: any;
  };
};

export function useQuery(path?: string) {
  const route = useRoute();
  const URL = computed(() => {
    return path ? `${path}?${Qs.stringify(route.query)}` : route.fullPath;
  });

  const data = ref<resProps>({
    result: [],
    loading: false,
    pageInfo: {
      page: 1,
      per_page: 10,
      total: 0,
      total_pages: 0,
    },
  });
  const reload = async () => {
    data.value.loading = true;
    const {
      data: result,
      support,
      ...pageInfo
    } = await getList({
      url: URL.value,
      params: {},
    });
    await sleep(500);
    data.value = {
      result,
      loading: false,
      pageInfo,
    };
  };
  if (isRef(URL)) {
    watch(URL, reload);
  }
  reload();
  return { data, reload };
}
