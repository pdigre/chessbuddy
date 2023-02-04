import { makeAutoObservable } from 'mobx';
import { playService } from './index.service';

export class TimerService {
  elapsed = 0;

  constructor() {
    makeAutoObservable(this);
    setInterval(() => {
      this.update(playService.isPlaying);
    }, 1000);
  }

  update = (isPlaying: boolean) => {
    if (isPlaying) this.elapsed++;
  };
  reset = () => {
    this.elapsed = 0;
  };
}
