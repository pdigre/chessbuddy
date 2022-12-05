import type { Fen, ShortMove } from '../util/rules';

export type LoadBot = () => RunBot;
export type RunBot = (fen: Fen) => Promise<ShortMove>;
export type UciCallback = (move: ShortMove) => void;

export class WorkerBot {
  workerClass: LoadBot;
  workerInstance?: RunBot;
  isRunning = false;

  constructor(path: string, skill: number, time: number, depth: number) {
    this.workerClass = this.createWorker(path, skill, time, depth);
  }

  createWorker: (path: string, skill: number, time: number, depth: number) => LoadBot =
    (path, skill, time, depth) => () => {
      const actions = [`setoption name Skill Level value ${skill}`];
      actions.push(time ? `go movetime ${time}000` : `go depth ${depth}`);

      const worker = new Worker(path);
      let uciCallback: UciCallback | null = null;

      worker.addEventListener('message', e => {
        const move = e.data.match(/^bestmove\s([a-h][1-8])([a-h][1-8])/);
        if (move && uciCallback) {
          uciCallback({ from: move[1], to: move[2] });
          uciCallback = null;
        }
      });

      return fen =>
        new Promise((callback, reject) => {
          if (uciCallback) {
            reject('Pending move is present');
            return;
          }
          uciCallback = callback;
          worker.postMessage(`position fen ${fen}`);
          actions.forEach(action => worker.postMessage(action));
        });
    };

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

export class UciEngineDef {
  constructor(public name: string, public path: string) {}
}

export const UciEngineDefs: UciEngineDef[] = [
  new UciEngineDef('Stockfish', 'bots/stockfish.js-10.0.2/stockfish.js'),
  new UciEngineDef('Lozza', 'bots/lozza-1.18/lozza.js'),
];
