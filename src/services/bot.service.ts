import { Bot } from '../model/bot';
import { Human } from '../model/human';
import type { Fen, ShortMove } from './chessrules.service';

type LoadBot = () => RunBot;
type RunBot = (fen: Fen) => Promise<ShortMove>;
type UciCallback = (move: ShortMove) => void;

export class BotRunner {
  workerClass: LoadBot;
  workerInstance?: RunBot;
  worker?: Worker;
  isRunning = false;

  constructor(public name: string, path: string, skill: number, time: number, depth: number) {
    this.workerClass = this.createWorker(path, skill, time, depth);
  }

  createWorker: (path: string, skill: number, time: number, depth: number) => LoadBot =
    (path, skill, time, depth) => () => {
      const actions = [`setoption name Skill Level value ${skill}`];
      actions.push(time ? `go movetime ${time}000` : `go depth ${depth}`);
      const worker = new Worker(path);
      this.worker = worker;
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

export class BotService {
  public instantiate(
    player: Human | Bot | undefined,
    current: Human | Bot | BotRunner | undefined
  ): BotRunner | undefined {
    if (current instanceof BotRunner && current.name !== player?.name) {
      if (current.isRunning) {
        current.worker?.terminate();
      }
    }
    return player instanceof Bot
      ? new BotRunner(
          player.name,
          player.uciEngineDef.path,
          player.skill,
          player.depth,
          player.time
        )
      : undefined;
  }
}

export const botService = new BotService();
