import { watch, ref, isRef } from "vue";
import { httpRequest } from "@/api";

export function useFetch(URL: string) {
  const data = ref({});
  const reload = async () => {
    const res = await httpRequest.get(URL);
    data.value = res.data;
  };
  if (isRef(URL)) {
    watch(URL, reload);
  }
  reload();
  return { data, reload };
}
