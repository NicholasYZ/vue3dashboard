export { useDeviceDetector } from "@/utils/deviceDetector";

export const sleep = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
