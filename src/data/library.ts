class TK {
  ticker = () => {
    // to be reassigned
  };
  time = new Date().getTime();
  paused = 0;
  elapsed = 0;
  black = 0;
  white = 0;
  update = (isPlaying: boolean) => {
    const time1 = this.time;
    const time2 = new Date().getTime();
    this.time = time2;
    if (isPlaying) {
      this.elapsed += time2 - time1;
    } else {
      this.paused += time2 - time1;
    }
    return time2;
  };
  getUsed = () => {
    return Math.round(this.elapsed / 1000);
  };
  next = (isWhiteTurn: boolean) => {
    this.update(true);
    if (isWhiteTurn) {
      this.black += this.getUsed();
    } else {
      this.white += this.getUsed();
    }
    this.reset();
  };
  reset = () => {
    this.elapsed = 0;
    this.paused = 0;
    this.time = new Date().getTime();
  };
}

export const TimeKeeper = new TK();

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
