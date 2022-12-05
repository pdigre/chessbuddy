import { Storable } from '../services/storage.service';

export type TimeRule = {
  from?: number;
  plus?: number;
  each?: number;
};

export class Clock implements Storable {
  constructor(public name: string, public time: TimeRule[]) {}
  public static storage = 'clocks';

  printTime: () => string = () =>
    this.time
      .map(
        t => (t.from ? t.from : '') + (t.plus ? '+' + t.plus : '') + (t.each ? ':' + t.each : '')
      )
      .join(' ');

  public static create(split: string[]): Clock {
    return new Clock(
      split[1],
      split[2].split(',').map(x => {
        const s = x.split('.');
        return {
          from: Number.parseInt(s[0]),
          plus: Number.parseInt(s[1]),
          each: Number.parseInt(s[2]),
        };
      })
    );
  }

  toString: () => string = () => `Clock:${this.name}:${this.time2string()}`;

  time2string: () => string = () => this.time.map(s => `${s.from}.${s.plus}.${s.each}`).join(',');

  public static init = `
    Clock:No limit:
    Clock:FIDE Classic - 120/60/13/30:.120.,40.60.,60.15.10
    Clock:FIDE Rapid - 15/10:.15.10
    Clock:Rapid - 10/10:.10.10
    Clock:FIDE Blitz - 3/2:.3.2
    Clock:Blitz - 5/0:.5.
    `;
}
