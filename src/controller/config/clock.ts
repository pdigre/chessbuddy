import { makeAutoObservable } from 'mobx';
import { gameState } from '../game/game';

export type ClockType = {
  name: string;
  baseTime: number;
  each?: number;
  move40?: number;
  move60?: number;
  each60?: number;
};

export const Clocks: ClockType[] = [
  {
    name: 'No limit',
    baseTime: 0,
  },
  {
    name: 'FIDE Standard - 120/60/13/30',
    baseTime: 120 * 60,
    move40: 60 * 60,
    move60: 15 * 60,
    each60: 30,
  },
  {
    name: 'FIDE Rapid - 15/10',
    baseTime: 15 * 60,
    each: 10,
  },
  {
    name: 'Rapid - 10/10',
    baseTime: 15 * 60,
    each: 10,
  },
  {
    name: 'FIDE Blitz - 3/2',
    baseTime: 3 * 60,
    each: 2,
  },
  {
    name: 'Blitz - 5/0',
    baseTime: 3 * 60,
    each: 2,
  },
];

export class Clock {
  elapsed = 0;
  clockType = Clocks[0];

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

export const clock = new Clock();
