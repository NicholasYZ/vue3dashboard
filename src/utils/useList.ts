import { useQuery } from "@/utils";

export function useList(path?: string) {
  const { data, reload } = useQuery(path);
  const onEdit = (row: { [key: string]: any }) => {
    console.log(row);
    reload();
  };
  const onDel = (row: { [key: string]: any }) => {
    console.log(row);
  };
  const onView = (row: { [key: string]: any }) => {
    console.log(row);
  };
  const onAdd = (row: { [key: string]: any } | undefined) => {
    console.log(row);
    reload();
  };
  return { data, onAdd, onView, onEdit, onDel };
}
