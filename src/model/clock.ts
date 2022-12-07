import { Storable } from '../services/storage.service';
import { ListItem } from './config';

export type TimeRule = {
  from: number;
  plus: number;
  each: number;
};

export class Clock implements Storable, ListItem {
  constructor(public name: string, public time: TimeRule[]) {}
  public static storage = 'clocks';

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

  toString: () => string = () => `${this.getName()}:${this.getDescription()}`;

  static time2string: (time: TimeRule[]) => string = time =>
    time
      .map(s => `${s.from ? s.plus : ''}${s.plus ? '+' + s.plus : ''}${s.each ? '/' + s.each : ''}`)
      .join(',');

  getName: () => string = () => this.name.trim();
  getDescription: () => string = () => Clock.time2string(this.time);

  public static create(split: string[]): Clock {
    return new Clock(split[0].trim(), Clock.string2time(split[1]));
  }

  public static init = `
    No limit:
    FIDE Classic - 120/60/13/30:+120,40+60,60+15/10
    FIDE Rapid - 15/10:+15/10
    Rapid - 10/10:+10/10
    FIDE Blitz - 3/2:+3/2
    Blitz - 5/0:+5
    `;
}
