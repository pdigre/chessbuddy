import type { Fen, ShortMove } from '../util/rules';

export type LoadBot = () => RunBot;
export type RunBot = (fen: Fen) => Promise<ShortMove>;
export type UciCallback = (move: ShortMove) => void;

export const initUciEngine: (file: string, skill: number, depth: number, time: number) => LoadBot =
  (file, skill, depth, time) => () => {
    const actions = [`setoption name Skill Level value ${skill}`];
    actions.push(time ? `go movetime ${time}000` : `go depth ${depth}`);

    const worker = new Worker(file);
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
