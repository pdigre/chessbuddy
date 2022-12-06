import { Storable } from '../services/storage.service';
import { ListItem } from './config';

export class UciEngineDef {
  constructor(public name: string, public path: string) {}
}

export const UciEngineDefs: UciEngineDef[] = [
  new UciEngineDef('Stockfish', 'bots/stockfish.js-10.0.2/stockfish.js'),
  new UciEngineDef('Lozza', 'bots/lozza-1.18/lozza.js'),
];

export class Bot implements ListItem, Storable {
  uciEngineDef: UciEngineDef = UciEngineDefs[0];

  constructor(
    public name: string,
    public engine: string,
    public skill: number,
    public time: number,
    public depth: number
  ) {}

  getUciEngineDef = () => UciEngineDefs.find(x => x.name == this.engine);

  toString: () => string = () =>
    `Bot:${this.name}:${this.uciEngineDef.name},${this.skill},${this.time ?? ''},${
      this.depth ?? ''
    }`;
  getName: () => string = () => this.name;
  getDescription: () => string = () => this.toString();

  public static storage = 'bots';

  public static create(split: string[]): Bot {
    const skill = split[2].split(',');
    return new Bot(
      split[1],
      skill[0],
      Bot.parseNum(skill[1]),
      Bot.parseNum(skill[2]),
      Bot.parseNum(skill[3])
    );
  }

  public static parseNum(num: string) {
    const val = Number.parseInt(num);
    return isNaN(val) ? 0 : val;
  }

  public static init = `
    Bot:Stockfish easy:Stockfish,20,1,
    Bot:Stockfish med:Stockfish,1,,10
    Bot:Stockfish hard:Stockfish,20,,10
    Bot:Lozza easy:Lozza,20,1,
    Bot:Lozza med:Lozza,1,,10
    Bot:Lozza hard:Lozza,20,,10
    `;
}
