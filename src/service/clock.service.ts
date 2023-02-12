import { makeAutoObservable } from 'mobx';
import { toMMSS } from '../resources/library';
import { mediaService, playService } from './index.service';

export class ClockService {
  elapsed = 0;

  constructor() {
    makeAutoObservable(this);
    setInterval(() => {
      this.update(playService.isPlaying);
    }, 1000);
  }

  update(isPlaying: boolean) {
    isPlaying ? this.elapsed++ : this.elapsed;
  }

  reset() {
    this.elapsed = 0;
  }

  getClockText() {
    const current = Math.floor(this.elapsed) + playService.getStartTime();
    const allowed = playService.allowed;
    if (!allowed) {
      return current;
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
