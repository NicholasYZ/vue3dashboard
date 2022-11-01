import { watch, ref, isRef } from "vue";
import { request } from "@/api";

export function useFetch(URL: string) {
  const data = ref({});
  const reload = async () => {
    const res = await request.get(URL);
    data.value = res.data;
  };
  if (isRef(URL)) {
    watch(URL, reload);
  }
  reload();
  return { data, reload };
}
