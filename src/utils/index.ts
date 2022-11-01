export { useDevice } from "@/utils/useDevice";
export { useQuery } from "@/utils/useQuery";
export { useExport } from "@/utils/useExport";
export { deviceDetector } from "@/utils/deviceDetector";
export { useList } from "@/utils/useList";
export { useFetch } from "@/utils/useFetch";
export const sleep = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
