import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@/utils";

export function useList(config: any) {
  const route = useRoute();
  const isModelVisible = ref<boolean>(false);
  const query = computed(() => {
    return route.query;
  });
  const { data, reload } = useQuery({
    path: config.url || route.path,
    query,
  });
  const onDel = (form: any) => {
    console.log(`${form.id} Deleted succussful`);
  };
  const onView = (form: any) => {
    config.view.form = { ...form };
    isModelVisible.value = true;
  };
  const onEdit = (form: any) => {
    config.view.form = { ...form };
    isModelVisible.value = true;
  };
  const onSave = (form: any) => {
    isModelVisible.value = false;
    console.log(form);
    reload();
  };
  const onAdd = () => {
    isModelVisible.value = true;
  };
  return {
    data,
    config: ref(config),
    isModelVisible,
    reload,
    onDel,
    onView,
    onEdit,
    onSave,
    onAdd,
  };
}
