import { ListItem } from './model.ts';

export type TimeRule = {
  from: number;
  plus: number;
  each: number;
};

export class Clock implements ListItem {
  constructor(
    public name ='',
    public time: TimeRule[] = []
  ) {}
  label = 'Clock';
  getName: () => string = () => this.name.trim();
  getDescription: () => string = () => Clock.time2string(this.time);

  validate: () => string = () => (this.name.length ? '' : 'Need to enter a name');

  getAllowed(moves: number): number {
    return this.time
      .filter(time => moves >= time.from)
      .reduce((_total, time) => time.plus * 60 + time.each * (moves - time.from), 0);
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

  static stringify = (s: TimeRule) => {
    if (s && 'from' in s) {
      return `${s.from ? s.plus : ''}${s.plus ? '+' + s.plus : ''}${s.each ? '/' + s.each : ''}`;
    }
    return '';
  };

  static time2string = (times?: TimeRule[]) => (times ? times.map(Clock.stringify).join(',') : '');

  public static create: () => Clock = () => new Clock();

  public static initial = [
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
