export const deviceDetector = (): string => {
  return document.body.getBoundingClientRect().width < 768
    ? "mobile"
    : "desktop";
};
