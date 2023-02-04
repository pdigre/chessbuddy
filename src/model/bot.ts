import { ConfigProp, ListItem } from '../service/config.service';
import { Engine, Engines } from './engine';

export class Bot implements ListItem {
  uciEngineDef: Engine = Engines[0];

  constructor(
    public name: string,
    public engine: string,
    public skill: number,
    public time: number,
    public depth: number
  ) {}
  label = 'Bot';
  properties: Map<string, ConfigProp<string>> = new Map([
    ['name', { get: () => this.name, set: value => (this.name = value) }],
    ['engine', { get: () => this.engine, set: value => (this.engine = value) }],
    [
      'skill',
      { get: () => this.toTxt(this.skill), set: value => (this.skill = this.toInt(value)) },
    ],
    ['time', { get: () => this.toTxt(this.time), set: value => (this.time = this.toInt(value)) }],
    [
      'depth',
      { get: () => this.toTxt(this.depth), set: value => (this.depth = this.toInt(value)) },
    ],
  ]);
  getName: () => string = () => this.name;
  getDescription: () => string = () =>
    `${this.uciEngineDef.name},${this.skill},${this.time ?? ''},${this.depth ?? ''}`;
  validate: () => string = () => {
    if (!this.name.length) return 'Need to enter a name';
    if (!this.engine) return 'Need to select a chess engine';
    const nSkill = this.skill;
    if (isNaN(nSkill) || nSkill < 1 || nSkill > 20)
      return 'Need to enter skill level between 1 and 20';
    const nTime = this.time;
    if (nTime && (isNaN(nTime) || nTime < 1 || nTime > 60))
      return 'Need to enter a time between 1 and 60 seconds';
    const nDepth = this.depth;
    if (!nTime == !nDepth) return 'Need to enter time or depth, but not both';
    if (nDepth && (isNaN(nDepth) || nDepth < 6 || nDepth > 30))
      return 'Need to enter depth between 6 and 30';
    return '';
  };

  toInt: (num: string) => number = (num: string) => {
    const parsed = Number.parseInt(num);
    return isNaN(parsed) ? 0 : parsed;
  };

  toTxt: (num: number) => string = (num: number) => {
    return isNaN(num) ? '0' : num.toString();
  };

  public static init = [
    new Bot('Stockfish easy', 'Stockfish', 20, 1, 0),
    new Bot('Stockfish med', 'Stockfish', 1, 0, 10),
    new Bot('Stockfish hard', 'Stockfish', 20, 0, 1),
    new Bot('Lozza easy', 'Lozza', 20, 1, 0),
    new Bot('Lozza med', 'Lozza', 1, 0, 10),
    new Bot('Lozza hard', 'Lozza', 20, 0, 1),
  ];
  public static create: () => Bot = () => new Bot('', Engines[0].name, 0, 0, 0);
}
