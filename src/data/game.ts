import * as rules from './rules';
import { players, Human } from './players';
import { Player } from './player';
import { timeKeeper } from '../data/timekeeper';
import { San, locate } from './openings';
import { makeAutoObservable } from 'mobx';
import { helper } from './helper';
import { Bot } from './bots';

/*
 * Start and pause of game, starts the bots if in turn
 */
export class GameState {
  isPlaying = false;
  constructor() {
    makeAutoObservable(this);
  }
  run = () => {
    if (this.isPlaying) {
      game.playBot();
    }
  };
}
export const gameState = new GameState();

/*
 * Everything about the current game (can be restored when returning to browser later)
 */
export class Game {
  white = '';
  black = '';
  private bplayer?: Player;
  private wplayer?: Player;
  private date = new Date().getTime();
  wtime = 0;
  btime = 0;
  log: string[] = [];
  fen = rules.NEW_GAME;
  isWhiteTurn = true;
  isComplete = false;
  pgns: string[] = [];
  reset = () => {
    this.wtime = 0;
    this.btime = 0;
    this.log = [];
    this.fen = rules.NEW_GAME;
    this.isWhiteTurn = true;
    this.isComplete = false;
    helper.reset();
  };
  setPlayers = (white: string, black: string) => {
    this.white = white;
    this.black = black;
    this.wplayer = players.players.find(p => p.name == white);
    this.bplayer = players.players.find(p => p.name == black);
  };
  constructor() {
    makeAutoObservable(this);
    this.restoreFromLocalStorage();
  }
  addMove = (san: string) => {
    const prev = this.nextPlayer();
    if (prev instanceof Human) gameState.isPlaying = true;
    this.date = new Date().getTime();
    this.log.push(san);
    helper.reset();
    this.fen = rules.newFen(this.fen, san);
    this.calculate();
    timeKeeper.next(this.isWhiteTurn);
    if (this.isWhiteTurn) {
      this.btime = timeKeeper.black;
    } else {
      this.wtime = timeKeeper.white;
    }
    timeKeeper.reset();
    const next = this.nextPlayer();
    if (next instanceof Human) {
      helper.run(this.fen);
    }
    gameState.run();
  };
  playBot = () => {
    const next = this.nextPlayer();
    if (next instanceof Bot) {
      next.runBot(this.fen, ({ from, to }) => {
        const move = rules.move(game.fen, from, to);
        if (move) {
          const [newFen, action] = move;
          this.playMove(action.san);
        }
      });
    }
  };
  private calculate = () => {
    const san = this.log[this.log.length - 1];
    this.isComplete = rules.isEndMove(san) || rules.isGameOver(this.fen);
    if (this.isComplete) gameState.isPlaying = false;
    this.isWhiteTurn = rules.isWhiteTurn(this.fen);
    this.pgns = [];
    const pgn: San | undefined = locate(this.log);
    if (pgn) {
      this.pgns = rules.findInfoMarkers(
        pgn.children.map(x => x.san),
        this.fen
      );
    }
  };
  nextPlayer = () => {
    return this.isWhiteTurn ? this.wplayer : this.bplayer;
  };
  toString = () =>
    `${this.date.toString(36)};${this.white};${this.black};${this.wtime.toString(
      36
    )};${this.btime.toString(36)};${this.log.join(' ')}`;
  restoreFromLocalStorage = () => {
    const _game = (localStorage.getItem('game') ?? new Date().getTime() + ';User;User;0;0;').split(
      ';'
    );
    this.log = _game[5] ? _game[5].split(' ') : [];
    this.setPlayers(_game[1], _game[2]);
    this.fen = rules.replay(this.log);
    this.wtime = Number.parseInt(_game[3]);
    this.btime = Number.parseInt(_game[4]);
    this.date = Number.parseInt(_game[0]);
    this.calculate();
  };

  playMove = (san: string) => {
    this.addMove(san);
    localStorage.setItem('game', this.toString());
    if (this.isComplete) {
      gameHistory.storeGame();
    }
  };
}
export const game = new Game();

const getDeviceInfo = () => {
  const dev1 = localStorage.getItem('device');
  if (dev1) return dev1;
  const dev = {
    first: new Date().getTime().toString(36),
    userAgent: navigator.userAgent,
    width: window.screen.width,
    height: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  };
  const dev2 = JSON.stringify(dev);
  localStorage.setItem('device', dev2);
  return dev2;
};

export const deviceInfo = getDeviceInfo();

/*
 * History of previous games, should store a maximum locally
 */
export class GameHistory {
  history: string[];

  constructor() {
    makeAutoObservable(this);
    this.history = this.loadHistory();
  }

  storeGame() {
    this.history.push(game.toString());
    localStorage.setItem('log', this.history.join('\n') ?? []);
  }

  private loadHistory() {
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
    return h2;
  }
}
export const gameHistory = new GameHistory();
