/*
 * Utilities
 */
export const toMMSS = (sec_num: number) => {
  const m = Math.floor(sec_num / 60);
  const s = sec_num - m * 60;
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
};
