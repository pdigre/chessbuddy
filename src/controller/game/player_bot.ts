import { RunBot, UciCallback, initUciEngine, LoadBot } from './uci_engine';
import { Player } from './player';

class UciEngineDef {
  constructor(public name: string, public path: string) {}
}

export const UciEngineDefs: UciEngineDef[] = [
  new UciEngineDef('Stockfish', 'bots/stockfish.js-10.0.2/stockfish.js'),
  new UciEngineDef('Lozza', 'bots/lozza-1.18/lozza.js'),
];

export class Bot extends Player {
  uciEngineDef: UciEngineDef = UciEngineDefs[0];
  workerClass: LoadBot;
  workerInstance?: RunBot;
  isRunning = false;

  constructor(
    public engine: string,
    public skill: number,
    public depth: number,
    public time: number
  ) {
    super(`${engine} skill=${skill} ` + (time ? ` time=${time}` : `depth=${depth}`));
    this.uciEngineDef = UciEngineDefs.find(x => x.name == engine) as UciEngineDef;
    this.workerClass = initUciEngine(this.uciEngineDef.path, skill, depth, time);
  }

  toString: () => string = () =>
    `Bot:${this.uciEngineDef.name}:${this.skill}:${this.time ?? ''}:${this.depth ?? ''}`;

  processFen: (fen: string, callback: UciCallback) => void = (fen, callback) => {
    if (!this.isRunning) {
      if (!this.workerInstance) this.workerInstance = this.workerClass();
      this.isRunning = true;
      this.workerInstance(fen).then(move => {
        callback(move);
        this.isRunning = false;
      });
    }
  };
}
