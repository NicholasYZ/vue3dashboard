import { watch, ref, isRef } from "vue";
import type { Ref } from "vue";
import { getList } from "@/api";

type resProps = {
  result: any[];
  loading: boolean;
  pageInfo: {
    [key: string]: any;
  };
};

export function useQuery(url: Ref<string>) {
  const res = ref<resProps>({
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
    res.value.loading = true;
    const {
      data: result,
      support,
      ...pageInfo
    } = await getList({
      url: url.value,
      params: {},
    });
    res.value = {
      result,
      loading: false,
      pageInfo,
    };
  };
  if (isRef(url)) {
    watch(url, reload);
  }
  reload();
  return { res, reload };
}
