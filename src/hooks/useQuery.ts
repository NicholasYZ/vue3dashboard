import { watch, ref, isRef } from "vue";
import type { Ref } from "vue";
import { sleep } from "@/utils";
import { getList } from "@/api";

type resProps = {
  result: any[];
  loading: boolean;
  pageInfo: {
    [key: string]: any;
  };
};

export function useQuery(route: { path: string; query: Ref<any> }) {
  const { query, path } = route;
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
    const { result, ...pageInfo } = await getList({
      path,
      query: query.value,
    });
    await sleep(500);
    data.value = {
      result,
      loading: false,
      pageInfo,
    };
  };
  if (isRef(route.query)) {
    watch(route.query, reload);
  }
  reload();
  return { data, reload };
}
