import { action, computed, makeObservable, observable } from 'mobx';
import { bluetoothService, mediaService, playService } from './index.service';
import { OutOfTime, TimeClick } from 'service/bluetooth.service.ts';

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
    if (remains < 0) {
      // Finished - out of time
      mediaService.soundError();
      bluetoothService.beep(OutOfTime);
      playService.outOfTime();
    } else if (remains < 11) {
      // Warning running out of time
      mediaService.soundClick();
      bluetoothService.beep(TimeClick);
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
