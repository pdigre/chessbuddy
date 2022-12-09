import { ListItem } from './config';

export class UciEngineDef {
  constructor(public name: string, public path: string) {}
}

export const UciEngineDefs: UciEngineDef[] = [
  new UciEngineDef('Stockfish', 'bots/stockfish.js-10.0.2/stockfish.js'),
  new UciEngineDef('Lozza', 'bots/lozza-1.18/lozza.js'),
];

export class Bot implements ListItem {
  uciEngineDef: UciEngineDef = UciEngineDefs[0];

  constructor(
    public name: string,
    public engine: string,
    public skill: number,
    public time: number,
    public depth: number
  ) {}

  getUciEngineDef = () => UciEngineDefs.find(x => x.name == this.engine);

  getName: () => string = () => this.name;
  getDescription: () => string = () =>
    `${this.uciEngineDef.name},${this.skill},${this.time ?? ''},${this.depth ?? ''}`;

  public static init = [
    new Bot('Stockfish easy', 'Stockfish', 20, 1, 0),
    new Bot('Stockfish med', 'Stockfish', 1, 0, 10),
    new Bot('Stockfish hard', 'Stockfish', 20, 0, 1),
    new Bot('Lozza easy', 'Lozza', 20, 1, 0),
    new Bot('Lozza med', 'Lozza', 1, 0, 10),
    new Bot('Lozza hard', 'Lozza', 20, 0, 1),
  ];
}
