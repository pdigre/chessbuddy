import { ListItem } from './config';
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
