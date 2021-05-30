import { makeAutoObservable } from 'mobx';
import { gameState } from './game';

class TimeKeeper {
  time = new Date().getTime();
  paused = 0;
  elapsed = 0;
  black = 0;
  white = 0;

  constructor() {
    makeAutoObservable(this);
    setInterval(() => {
      this.update(gameState.isPlaying);
    }, 1000);
  }

  update = (isPlaying: boolean) => {
    const time1 = this.time;
    const time2 = new Date().getTime();
    this.time = time2;
    if (isPlaying) {
      this.elapsed += time2 - time1;
    } else {
      this.paused += time2 - time1;
    }
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

export const timeKeeper = new TimeKeeper();
