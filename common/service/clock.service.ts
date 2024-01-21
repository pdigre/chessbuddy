import { action, computed, makeObservable, observable } from 'mobx';
import { mediaService, playService } from './index.service';

export class ClockService {
  elapsed = 0;

  constructor() {
    makeObservable(this, {
      elapsed: observable,
      clockText: computed,
    });
    setInterval(
      action(() => {
        playService.isPlaying ? this.elapsed++ : this.elapsed;
      }),
      1000
    );
  }

  reset() {
    this.elapsed = 0;
  }

  get clockText() {
    const current = Math.floor(this.elapsed) + playService.getStartTime();
    const allowed = playService.allowed;
    if (!allowed) {
      return toMMSS(current);
    }
    const remains = allowed - current;
    if (remains < 11) {
      mediaService.soundClick();
    }
    if (remains < 0) {
      mediaService.soundError();
      playService.outOfTime();
    }
    return toMMSS(allowed - current);
  }
}

export const toMMSS: (sec_num: number) => string = sec_num => {
  const secs = isNaN(sec_num) ? 0 : sec_num;
  const m = Math.floor(secs / 60);
  const s = secs - m * 60;
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
};
