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
  addMove = (fen: string, san: string) => {
    this.date = new Date().getTime();
    this.log.push(san);
    this.fen = fen;
    this.isComplete = rules.isGameOver(fen);
    const wt = rules.isWhiteTurn(fen);
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
        fen
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
}

export class GameRunner {
  game = new CurrentGame('User', 'User');

  newGame = (white: string, black: string) => {
    this.game = new CurrentGame(white, black);
  };
}

export const gamerunner = new GameRunner();
