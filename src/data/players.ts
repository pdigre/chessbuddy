import type { Fen, ShortMove } from './rules';

export type UninitialisedBot = () => InitialisedBot;
export type InitialisedBot = (fen: Fen) => Promise<ShortMove>;
export type Resolver = (move: ShortMove) => void;

export class UCI_ENGINE {
  name: string;
  path: string;
  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }
}

export abstract class Player {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class Human extends Player {}

export class Bot extends Player {
  type: UCI_ENGINE = UCI_ENGINES[0];
  skill: number;
  time?: number;
  depth?: number;
  engine: UninitialisedBot;
  instance?: InitialisedBot;
  isRunning = false;

  constructor(type: UCI_ENGINE, skill: number, time?: number, depth?: number) {
    super(`${type.name} skill=${skill} ` + (time ? ` time=${time}` : `depth=${depth}`));
    this.type = type;
    this.skill = skill;
    this.time = time;
    this.depth = depth;
    const options = [`setoption name Skill Level value ${skill}`];
    options.push(time ? `go movetime ${time}000` : `go depth ${depth}`);
    this.engine = uciWorker(type.path, options);
  }
}

export const UCI_ENGINES: UCI_ENGINE[] = [
  new UCI_ENGINE('Stockfish', 'bots/stockfish.js-10.0.2/stockfish.js'),
  new UCI_ENGINE('Lozza', 'bots/lozza-1.18/lozza.js'),
];

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

export const players: Player[] = [
  new Human('User'),
  new Bot(UCI_ENGINES[0], 1, undefined, 10),
  new Bot(UCI_ENGINES[0], 20, undefined, 10),
  new Bot(UCI_ENGINES[0], 20, 1, undefined),
  new Bot(UCI_ENGINES[1], 1, undefined, 10),
  new Bot(UCI_ENGINES[1], 20, undefined, 10),
  new Bot(UCI_ENGINES[1], 20, 1, undefined),
];

export const runBot = (pname: string, fen: string, resolver: Resolver) => {
  const player = players.find(p => p.name == pname && p instanceof Bot);
  if (player instanceof Bot) {
    const bot = player as Bot;
    if (!bot.isRunning) {
      if (!bot.instance) bot.instance = bot.engine();
      bot.isRunning = true;
      bot.instance(fen).then(move => {
        resolver(move);
        bot.isRunning = false;
      });
    }
  }
};
