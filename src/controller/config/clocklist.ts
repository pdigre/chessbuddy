import { makeAutoObservable } from 'mobx';
import { gameState } from '../game/game';

export type TimeRule = {
  from?: number;
  plus?: number;
  each?: number;
};

export class Clock {
  constructor(public name: string, public time: TimeRule[]) {}

  printTime: () => string = () =>
    this.time
      .map(
        t => (t.from ? t.from : '') + (t.plus ? '+' + t.plus : '') + (t.each ? ':' + t.each : '')
      )
      .join(' ');

  public static create(name: string, time: string): Clock {
    return new Clock(
      name,
      time.split(',').map(x => {
        const s = x.split('.');
        return {
          from: Number.parseInt(s[0]),
          plus: Number.parseInt(s[1]),
          each: Number.parseInt(s[2]),
        };
      })
    );
  }
}

export const clockInit: Clock[] = [
  new Clock('No limit', []),
  new Clock('FIDE Standard - 120/60/13/30', [
    { plus: 120 * 60 },
    { from: 40, plus: 60 * 60 },
    { from: 60, plus: 15 * 60, each: 10 },
  ]),
  new Clock('FIDE Rapid - 15/10', [{ plus: 15 * 60, each: 10 }]),
  new Clock('Rapid - 10/10', [{ plus: 10 * 60, each: 10 }]),
  new Clock('FIDE Blitz - 3/2', [{ plus: 3 * 60, each: 2 }]),
  new Clock('Blitz - 5/0', [{ plus: 5 * 60 }]),
];

export class ClockList {
  clocks: Clock[] = clockInit;
  current: Clock = clockInit[0];
  addDialog = false;
  elapsed = 0;

  constructor() {
    makeAutoObservable(this);
    setInterval(() => {
      this.update(gameState.isPlaying);
    }, 1000);

    const pdata = localStorage.getItem('clocks');
    if (pdata) {
      this.restore(pdata);
    }
  }

  save: VoidFunction = () => {
    const data = this.toString();
    localStorage.setItem('clocks', data);
  };
  addClock: (data: string) => void = data => {
    const clock = this.createClock(data);
    if (clock) this.clocks.push(clock);
  };

  delClock: (name: string) => void = name => {
    const i = this.clocks.findIndex(x => x.name == name);
    if (i >= 0) this.clocks.splice(i, 1);
  };

  update = (isPlaying: boolean) => {
    if (isPlaying) this.elapsed++;
  };
  reset = () => {
    this.elapsed = 0;
  };
  private createClock = (data: string) => {
    if (data.includes('undefined')) return undefined;
    const split = data.split(':');
    return Clock.create(split[0], split[1]);
  };
  private toString = () => this.clocks.map(x => x.toString()).join('\n');

  private restore = (data: string) =>
    data
      .replace(/\r/, '')
      .split('\n')
      .forEach(x => this.addClock(x));
}

export const clockList = new ClockList();
