import { makeAutoObservable } from 'mobx';
import { gameState } from './game';

class TimeKeeper {
  elapsed = 0;

  constructor() {
    makeAutoObservable(this);
    setInterval(() => {
      this.update(gameState.isPlaying);
    }, 1000);
  }

  update = (isPlaying: boolean) => {
    if (isPlaying) this.elapsed++;
  };
  reset = () => {
    this.elapsed = 0;
  };
}

export const timeKeeper = new TimeKeeper();
