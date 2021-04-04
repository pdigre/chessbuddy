export const TimeKeeper = {
  ticker: () => {
    // to be reassigned
  },
  time: new Date().getTime(),
  paused: 0,
  elapsed: 0,
  black: 0,
  white: 0,
  update: (isPlaying: boolean) => {
    const time1 = TimeKeeper.time;
    const time2 = new Date().getTime();
    TimeKeeper.time = time2;
    if (isPlaying) {
      TimeKeeper.elapsed += time2 - time1;
    } else {
      TimeKeeper.paused += time2 - time1;
    }
    return time2;
  },
  getUsed: () => {
    return Math.round(TimeKeeper.elapsed / 1000);
  },
  next: (isWhiteTurn: boolean) => {
    TimeKeeper.update(true);
    if (isWhiteTurn) {
      TimeKeeper.black += TimeKeeper.getUsed();
    } else {
      TimeKeeper.white += TimeKeeper.getUsed();
    }
    TimeKeeper.reset();
  },
  reset: () => {
    TimeKeeper.elapsed = 0;
    TimeKeeper.paused = 0;
    TimeKeeper.time = new Date().getTime();
  },
};

global.setInterval(() => TimeKeeper.ticker(), 1000);

export const toMMSS = (sec_num: number) => {
  const m = Math.floor(sec_num / 60);
  const s = sec_num - m * 60;
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
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
