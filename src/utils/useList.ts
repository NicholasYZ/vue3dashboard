import { useQuery } from "@/utils";
import { ref } from "vue";

export function useList(path?: string) {
  const { data, reload } = useQuery(path);
  const isModelVisible = ref<boolean>(false);
  const selectedItem = ref<{ [key: string]: any }>({});
  const edit = (row: { [key: string]: any }) => {
    selectedItem.value = row;
    toggle(true);
  };
  const del = (row: { [key: string]: any }) => {
    console.log(row);
  };
  const view = (row: { [key: string]: any }) => {
    console.log(row);
  };
  const add = () => {
    selectedItem.value = {};
    toggle(true);
  };
  const save = () => {
    reload();
    toggle(false);
  };
  const toggle = (type?: boolean) => {
    isModelVisible.value = type || false;
  };
  return {
    data,
    isModelVisible,
    selectedItem,
    methods: { add, view, edit, del, save, toggle },
  };
}
