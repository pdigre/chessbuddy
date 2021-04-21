import type { Fen } from './rules';
import { UCI_ENGINES } from './bots';
import { makeAutoObservable } from 'mobx';

type HelperReturn = { moves: string[]; cp: number };
type HelpResolver = (ret: HelperReturn) => void;
type UninitialisedHelper = () => InitialisedHelper;
type InitialisedHelper = (fen: Fen) => Promise<HelperReturn>;

const helpWorker = (): UninitialisedHelper => () => {
  const worker = new Worker(UCI_ENGINES[0].path);
  let resolver: HelpResolver | null = null;
  let cp = 0;
  let moves: string[] = [];
  worker.addEventListener('message', e => {
    //    console.log(e.data);
    const s = e.data.split(' ') as string[];
    const i1 = s.indexOf('cp');
    const i2 = s.indexOf('pv');
    if (s[0] == 'info' && i1 && i2) {
      cp = Number.parseInt(s[i1 + 1]);
      const pv = s[i2 + 1];
      const pv1 = pv.substring(0, 2);
      const pv2 = pv.substring(2, 4);
      moves.push(pv1, pv2);
    }
    if (s[0] == 'bestmove' && resolver) {
      resolver({
        moves: [...new Set(moves.reverse())],
        cp: cp,
      });
      moves = [];
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

class HelperBot {
  instance: InitialisedHelper;
  isRunning = false;
  constructor() {
    this.instance = helpWorker()();
  }
  run = (fen: string, resolver: HelpResolver) => {
    if (!this.isRunning) {
      this.isRunning = true;
      this.instance(fen).then(ret => {
        resolver(ret);
        this.isRunning = false;
      });
    }
  };
}
const helperBot = new HelperBot();

/*
 * Run Stockfish 1 sec to get best moves and CP
 */
export class Helper {
  help: string[] = [];
  cp = 0;
  constructor() {
    makeAutoObservable(this);
  }
  reset = () => (this.help = []);
  run = (fen: string, isWhiteTurn: boolean) => {
    this.reset();
    helperBot.run(fen, ({ moves, cp }) => {
      const squares: Set<string> = new Set();
      moves.forEach(x => squares.add(x));
      this.help = [...squares];
      this.cp = isWhiteTurn ? cp : -cp;
    });
  };
}
export const helper = new Helper();
