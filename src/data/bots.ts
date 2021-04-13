import type { Fen, ShortMove } from './rules';
import { Player } from './player';

type UninitialisedBot = () => InitialisedBot;
type InitialisedBot = (fen: Fen) => Promise<ShortMove>;
type Resolver = (move: ShortMove) => void;

class UCI_ENGINE {
  name: string;
  path: string;
  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }
}
export const UCI_ENGINES: UCI_ENGINE[] = [
  new UCI_ENGINE('Stockfish', 'bots/stockfish.js-10.0.2/stockfish.js'),
  new UCI_ENGINE('Lozza', 'bots/lozza-1.18/lozza.js'),
];

export class Bot extends Player {
  type: UCI_ENGINE = UCI_ENGINES[0];
  skill: number;
  time?: number;
  depth?: number;
  engine: UninitialisedBot;
  instance?: InitialisedBot;
  isRunning = false;

  constructor(engine: string, skill: number, time?: number, depth?: number) {
    super(`${engine} skill=${skill} ` + (time ? ` time=${time}` : `depth=${depth}`));
    const type = UCI_ENGINES.find(x => x.name == engine) as UCI_ENGINE;
    this.type = type;
    this.skill = skill;
    this.time = time;
    this.depth = depth;
    const options = [`setoption name Skill Level value ${skill}`];
    options.push(time ? `go movetime ${time}000` : `go depth ${depth}`);
    this.engine = uciWorker(type.path, options);
  }

  runBot = (fen: string, resolver: Resolver) => {
    if (!this.isRunning) {
      if (!this.instance) this.instance = this.engine();
      this.isRunning = true;
      this.instance(fen).then(move => {
        resolver(move);
        this.isRunning = false;
      });
    }
  };
  toString = () => `Bot:${this.type.name}:${this.skill}:${this.time ?? ''}:${this.depth ?? ''}`;
}

const uciWorker = (file: string, actions: Array<string>): UninitialisedBot => () => {
  const worker = new Worker(file);
  let resolver: Resolver | null = null;

  worker.addEventListener('message', e => {
    const move = e.data.match(/^bestmove\s([a-h][1-8])([a-h][1-8])/);
    if (move && resolver) {
      resolver({ from: move[1], to: move[2] });
      resolver = null;
    }
  });

  return fen =>
    new Promise((resolve, reject) => {
      if (resolver) {
        reject('Pending move is present');
        return;
      }
      resolver = resolve;
      worker.postMessage(`position fen ${fen}`);
      actions.forEach(action => worker.postMessage(action));
    });
};
