import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@/utils";

export function useList(path?: string) {
  const route = useRoute();
  const query = computed(() => {
    return route.query;
  });
  const { data, reload } = useQuery({
    path: path || route.path,
    query,
  });
  return {
    data,
    reload,
  };
}
