import { Storage } from './model.ts';

export class Log  implements Storage<Log>{
  constructor(public lines: string[]) {}
  name = () => 'log';
  save = () => this;
  load = (obj:Log) => (this.lines = obj.lines);
}

