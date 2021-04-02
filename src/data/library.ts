let ticker = () => {
  //
};

global.setInterval(() => ticker(), 1000);

export const setTimeFunc: (func: () => void) => void = func => {
  ticker = func;
};

export const toHHMMSS = (sec_num: number) => {
  const h = Math.floor(sec_num / 3600);
  const m = Math.floor((sec_num - h * 3600) / 60);
  const s = sec_num - h * 3600 - m * 60;
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
};

export const game2string = (
  start: Date | undefined,
  white: string,
  black: string,
  history: string[]
) => {
  const iso = start?.toISOString();
  const ymd = iso?.substring(2, 10).replaceAll('-', '');
  const hm = iso?.substring(11, 16);
  return ymd + ' ' + hm + ';' + white + ';' + black + ';' + history.join(' ');
};

export const log2arr = (log: string) => log.split('\n').filter(x => x.split(';').length == 4);
