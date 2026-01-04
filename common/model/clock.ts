import * as model from './model';

export type TimeRule = {
  from: number;
  plus: number;
  each: number;
};

export class Clock implements model.ListItem {
  constructor(
    public name = '',
    public time: string | TimeRule[] = ''
  ) {}
  label = 'Clock';
  getName: () => string = () => this.name.trim();
  getDescription: () => string = () =>
    Array.isArray(this.time) ? Clock.time2string(this.time) : this.time;

  getAllowed(moves: number): number {
    const timeRules = Array.isArray(this.time) ? this.time : Clock.string2time(this.time);
    return timeRules
      .filter(time => moves >= time.from)
      .reduce((_total, time) => time.plus * 60 + time.each * (moves - time.from), 0);
  }

  validate: () => string = () => {
    if (!this.name.length) return 'Need to enter a name';
    if (!this.time) return 'Need to enter a time';
    return '';
  };

  static string2time: (text: string) => TimeRule[] = text =>
    (text ?? '').split(',').map(x => {
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
    new Clock('No limit', ''),
    new Clock('FIDE Classic - 120/60/13/30', '+120,60+60,15+15/10'),
    new Clock('FIDE Rapid - 15/10', '+15/10'),
    new Clock('Rapid - 10/10', '+10/10'),
    new Clock('FIDE Blitz - 3/2', '+3/2'),
    new Clock('Blitz - 5/0', '+5'),
    new Clock('Bullet - 1/0', '+1'),
  ];
}
