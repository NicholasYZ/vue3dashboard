export const sleep = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const getDevice = (): string => {
  return document.body.getBoundingClientRect().width < 768
    ? "mobile"
    : "desktop";
};
