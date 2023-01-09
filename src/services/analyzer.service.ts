import type { Fen } from './chessrules.service';
import { makeAutoObservable, runInAction } from 'mobx';
import { Square } from 'chess.js';
import { Engines } from '../model/engine';

type AnalyzerReturn = { moves: string[]; cp: number | undefined };
type AnalyzerCallback = (ret: AnalyzerReturn) => void;
type LoadHelper = () => RunAnalyzer;
type RunAnalyzer = (fen: Fen) => Promise<AnalyzerReturn>;

class AnalyzerBot {
  instance: RunAnalyzer;
  isRunning = false;

  constructor() {
    this.instance = this.helpWorker()();
  }

  helpWorker = (): LoadHelper => () => {
    const worker = new Worker(Engines[0].path);
    let resolver: AnalyzerCallback | null = null;
    let cp: number | undefined = 0;
    let moves: string[] = [];
    worker.addEventListener('message', e => {
      //    console.log(e.data);
      const s = e.data.split(' ') as string[];
      if (s[0] == 'info') {
        const i1 = s.indexOf('cp');
        if (i1 >= 0) {
          cp = Number.parseInt(s[i1 + 1]);
        }
        const i2 = s.indexOf('pv');
        if (i2 >= 0) {
          const pv = s[i2 + 1];
          const pv1 = pv.substring(0, 2);
          const pv2 = pv.substring(2, 4);
          moves.push(pv1, pv2);
        }
      }
      if (s[0] == 'bestmove' && resolver) {
        resolver({
          moves: [...new Set(moves.reverse())],
          cp: cp,
        });
        moves = [];
        cp = undefined;
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
        worker.postMessage(`setoption name Skill Level value 20`);
        worker.postMessage(`go movetime 1000`);
      });
  };

  run = (fen: string, resolver: AnalyzerCallback) => {
    if (!this.isRunning) {
      this.isRunning = true;
      this.instance(fen).then(ret => {
        resolver(ret);
        this.isRunning = false;
      });
    }
  };
}

/*
 * Run Stockfish 1 sec to get best moves and CP
 */
export class AnalyzerService {
  help: Square[] = [];
  cp = 0;
  helperBot = new AnalyzerBot();

  constructor() {
    makeAutoObservable(this);
  }

  reset: VoidFunction = () => (this.help = []);
  run: (fen: string, isWhiteTurn: boolean) => void = (fen, isWhiteTurn) => {
    this.reset();
    this.helperBot.run(fen, ({ moves, cp }) => {
      const squares: Set<Square> = new Set();
      moves.forEach(x => squares.add(x as Square));
      this.help = [...squares];
      if (cp) {
        runInAction(() => {
          this.cp = isWhiteTurn ? cp : -cp;
        });
      }
    });
  };
}
