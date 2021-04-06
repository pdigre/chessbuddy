import * as rules from './rules';
import { getPlayers } from './players';
import { Player } from './player';
import { TimeKeeper, toMMSS } from './library';
import { San, locate } from './openings';

export type SaveGame = {
  date: number;
  white: string;
  black: string;
  wtime: number;
  btime: number;
  log: string[];
};

export class CurrentGame {
  date = new Date().getTime();
  white = '';
  black = '';
  bplayer?: Player;
  wplayer?: Player;
  wtime = 0;
  btime = 0;
  log: string[] = [];
  fen = rules.NEW_GAME;
  isWhiteTurn = true;
  isComplete = false;
  help: string[] = [];
  pgns: string[] = [];
  setPlayers = (white: string, black: string) => {
    this.white = white;
    this.black = black;
    this.wplayer = getPlayers().find(p => p.name == this.white);
    this.bplayer = getPlayers().find(p => p.name == this.black);
  };
  constructor(white: string, black: string) {
    this.setPlayers(white, black);
  }
  addMove = (san: string) => {
    this.date = new Date().getTime();
    this.log.push(san);
    this.fen = rules.newFen(this.fen, san);
    this.isComplete = rules.isEndMove(san) || rules.isGameOver(this.fen);
    const wt = rules.isWhiteTurn(this.fen);
    this.isWhiteTurn = wt;
    this.help = [];
    TimeKeeper.next(wt);
    if (wt) {
      this.btime = TimeKeeper.black;
    } else {
      this.wtime = TimeKeeper.white;
    }
    TimeKeeper.reset();
    this.pgns = [];
    const pgn: San | undefined = locate(this.log);
    if (pgn) {
      this.pgns = rules.findInfoMarkers(
        pgn.children.map(x => x.san),
        this.fen
      );
    }
  };
  getTitleTexts = () => {
    const elapsed = TimeKeeper.getUsed();
    const wtimer = !this.isComplete && this.isWhiteTurn ? this.wtime + elapsed : this.wtime;
    const wtext = `White: ${this.white} ${toMMSS(wtimer)} ${
      this.isComplete && !this.isWhiteTurn ? ' ** Winner **' : ''
    }`;
    const btimer = !this.isComplete && !this.isWhiteTurn ? this.btime + elapsed : this.btime;
    const btext = `Black: ${this.black} ${toMMSS(btimer)} ${
      this.isComplete && this.isWhiteTurn ? ' ** Winner **' : ''
    }`;
    return [wtext, btext];
  };
  nextPlayer = () => {
    return this.isWhiteTurn ? this.wplayer : this.bplayer;
  };
  toString = () =>
    `${this.date.toString(36)};${this.white};${this.black};${this.wtime.toString(
      36
    )};${this.btime.toString(36)};${this.log.join(' ')}`;
}

class GameRunner {
  curr?: CurrentGame;
  hist?: string[];
  newGame = (white: string, black: string) => {
    this.curr = new CurrentGame(white, black);
    return this.curr;
  };
  addMove = (san: string) => {
    const g = this.getGame();
    g.addMove(san);
    if (g.isComplete) {
      const h = this.getHistory();
      h.push(g.toString());
      localStorage.setItem('log', h.join('\n') ?? []);
    }
    return g.log;
  };
  getHistory: () => string[] = () => {
    if (this.hist) return this.hist;
    const h1 = localStorage.getItem('log')?.replaceAll('\r', '').split('\n') ?? [];
    const h2: string[] = [];
    h1.forEach(x => {
      const s = x.split(';');
      if (s.length == 6) {
        h2.push(x);
      } else if (s.length == 4) {
        let d = Date.parse(s[0]);
        if (isNaN(d)) {
          d = Number.parseInt(s[0]) * 1000;
        }
        if (isNaN(d)) {
          console.log('Unknown date ' + s[0]);
        } else {
          h2.push(d.toString(36) + ';' + s[1] + ';' + s[2] + ';0;0;' + s[3]);
        }
      } else {
        console.log('Unknown format ' + x);
      }
    });
    this.hist = h2;
    return this.hist as string[];
  };
  getGame = () => (this.curr ? this.curr : this.newGame('User', 'User'));
}

export const gamerunner = new GameRunner();
