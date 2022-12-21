import { ListItem } from './config';

export type TimeRule = {
  from: number;
  plus: number;
  each: number;
};

export class Clock implements ListItem {
  constructor(public name: string, public time: TimeRule[]) {}
  getName: () => string = () => this.name.trim();
  getDescription: () => string = () => Clock.time2string(this.time);

  getAllowed(moves: number): number {
    const total = this.time
      .filter(time => moves >= time.from)
      .reduce((total, time) => time.plus * 60 + time.each * (moves - time.from), 0);
    return total;
  }

  static string2time: (text: string) => TimeRule[] = text =>
    text.split(',').map(x => {
      const i1 = Number.parseInt(x.split('+')[0].split('/')[0]);
      const s2 = x.split('+');
      const i2 = s2.length > 1 ? Number.parseInt(s2[1].split('/')[0]) : 0;
      const s3 = x.split('/');
      const i3 = s3.length > 1 ? Number.parseInt(s3[1]) : 0;
      return {
        from: isNaN(i1) ? 0 : i1,
        plus: isNaN(i2) ? 0 : i2,
        each: isNaN(i3) ? 0 : i3,
      };
    });

  static time2string: (time: TimeRule[]) => string = time =>
    time
      .map(s => `${s.from ? s.plus : ''}${s.plus ? '+' + s.plus : ''}${s.each ? '/' + s.each : ''}`)
      .join(',');

  public static init = [
    new Clock('No limit', []),
    new Clock('FIDE Classic - 120/60/13/30', [
      { from: 0, plus: 120, each: 0 },
      { from: 40, plus: 60, each: 0 },
      { from: 60, plus: 15, each: 10 },
    ]),
    new Clock('FIDE Rapid - 15/10', [{ from: 0, plus: 15, each: 10 }]),
    new Clock('Rapid - 10/10', [{ from: 0, plus: 10, each: 10 }]),
    new Clock('FIDE Blitz - 3/2', [{ from: 0, plus: 3, each: 2 }]),
    new Clock('Blitz - 5/0', [{ from: 0, plus: 5, each: 0 }]),
  ];
}
