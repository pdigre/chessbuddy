import { GETSET, ListItem } from './model.ts';

export class Engine {
  constructor(
    public name: string,
    public path: string
  ) {}
}

export const Engines: Engine[] = [
  new Engine('Stockfish', 'bots/stockfish.js-10.0.2/stockfish.js'),
  new Engine('Lozza', 'bots/lozza-1.18/lozza.js'),
];

export class Bot implements ListItem {
  constructor(
    public name: string,
    public engine: string,
    public skill: number,
    public time: number,
    public depth: number
  ) {}
  label = 'Bot';
  properties: Map<string, GETSET<string>> = new Map([
    ['name', [() => this.name, v => (this.name = v)]],
    ['engine', [() => this.engine, v => (this.engine = v)]],
    ['skill', [() => this.toTxt(this.skill), v => (this.skill = this.toInt(v))]],
    ['time', [() => this.toTxt(this.time), v => (this.time = this.toInt(v))]],
    ['depth', [() => this.toTxt(this.depth), v => (this.depth = this.toInt(v))]],
  ]);
  getName: () => string = () => this.name;
  getDescription: () => string = () =>
    `${this.engine},${this.skill},${this.time ?? ''},${this.depth ?? ''}`;
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

  setEngine(value: string) {
    this.engine = value;
  }

  get getUciEngineDef() {
    return Engines.find(engine => engine.name == this.engine) ?? Engines[0];
  }

  public static init = [
    new Bot('Stockfish easy', 'Stockfish', 20, 1, 0),
    new Bot('Stockfish med', 'Stockfish', 1, 0, 10),
    new Bot('Stockfish hard', 'Stockfish', 20, 0, 1),
    new Bot('Lozza easy', 'Lozza', 20, 1, 0),
    new Bot('Lozza med', 'Lozza', 1, 0, 10),
    new Bot('Lozza hard', 'Lozza', 20, 0, 1),
  ];
  public static create: () => Bot = () => new Bot('', 'Stockfish', 0, 0, 0);
}
