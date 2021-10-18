import * as rules from './rules';
import { Human, players } from './players';
import { Player } from './player';
import { timeKeeper } from './timekeeper';
import { locate, San, tree } from './openings';
import { makeAutoObservable } from 'mobx';
import { helper } from './helper';
import { Bot } from './bots';
import { winner } from '../components/Emotion';

/*
 * Start and pause of game, starts the bots if in turn
 */
export class GameState {
  isPlaying = false;

  constructor() {
    makeAutoObservable(this);
  }

  run: VoidFunction = () => {
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
  wtime = 0;
  btime = 0;
  log: string[] = [];
  fen = rules.NEW_GAME;
  isWhiteTurn = true;
  isComplete = false;
  pgns: string[] = [];
  private bplayer?: Player;
  private wplayer?: Player;
  private date = Date.now();

  constructor() {
    makeAutoObservable(this);
    this.restoreFromLocalStorage();
  }

  reset: VoidFunction = () => {
    this.wtime = 0;
    this.btime = 0;
    this.log = [];
    this.fen = rules.NEW_GAME;
    this.isWhiteTurn = true;
    this.isComplete = false;
    helper.reset();
    this.run();
  };

  setPlayers: (white: string, black: string) => void = (white, black) => {
    this.white = white;
    this.black = black;
    this.wplayer = players.players.find(p => p.name == white);
    this.bplayer = players.players.find(p => p.name == black);
  };

  addMove: (san: string) => void = san => {
    const prev = this.nextPlayer();
    if (prev instanceof Human) gameState.isPlaying = true;
    this.date = Date.now();
    this.log.push(san);
    helper.reset();
    this.fen = rules.newFen(this.fen, san);
    if (this.isWhiteTurn) {
      this.wtime += timeKeeper.elapsed;
    } else {
      this.btime += timeKeeper.elapsed;
    }
    timeKeeper.reset();
    this.run();
  };
  run: VoidFunction = () => {
    timeKeeper.reset();
    this.calculate();
    const next = this.nextPlayer();
    if (next instanceof Human) {
      helper.run(this.fen, this.isWhiteTurn);
    }
    gameState.run();
  };

  playBot: VoidFunction = () => {
    const next = this.nextPlayer();
    if (next instanceof Bot) {
      next.runBot(this.fen, ({ from, to }) => {
        const move = rules.move(game.fen, from, to);
        if (move) {
          this.playMove(move[1].san);
        }
      });
    }
  };

  setPGNS: (sans: San[]) => void = sans => {
    this.pgns = rules.findInfoMarkers(
      sans.map(x => x.san),
      this.fen
    );
  };

  nextPlayer: () => Player | undefined = () => {
    return this.isWhiteTurn ? this.wplayer : this.bplayer;
  };

  toString: () => string = () =>
    `${this.date.toString(36)};${this.white};${this.black};${this.wtime.toString(
      36
    )};${this.btime.toString(36)};${this.log.join(' ')}`;

  restoreFromLocalStorage: VoidFunction = () => {
    const _game = (localStorage.getItem('game') ?? new Date().getTime() + ';User;User;0;0;').split(
      ';'
    );
    this.log = _game[5] ? _game[5].split(' ') : [];
    this.setPlayers(_game[1], _game[2]);
    this.fen = rules.replay(this.log);
    this.wtime = Number.parseInt(_game[3], 36);
    this.btime = Number.parseInt(_game[4], 36);
    this.date = Number.parseInt(_game[0]);
    if (isNaN(this.wtime)) this.wtime = 0;
    if (isNaN(this.btime)) this.btime = 0;
    this.calculate();
  };

  playMove: (san: string) => void = san => {
    this.addMove(san);
    localStorage.setItem('game', this.toString());
    if (this.isComplete) {
      gameHistory.storeGame();
    }
  };

  private calculate = () => {
    const san = this.log[this.log.length - 1];
    this.isComplete = rules.isEndMove(san) || rules.isGameOver(this.fen);
    if (this.isComplete) {
      gameState.isPlaying = false;
      winner();
    }
    this.isWhiteTurn = rules.isWhiteTurn(this.fen);
    this.pgns = [];
    if (this.log.length == 0) {
      this.setPGNS(tree);
    } else {
      const pgn: San | undefined = locate(this.log);
      if (pgn) this.setPGNS(pgn.children);
    }
  };
}

export const game = new Game();

/*
 * History of previous games, should store a maximum locally
 */
export class GameHistory {
  history: string[];

  constructor() {
    makeAutoObservable(this);
    this.history = this.loadHistory();
  }

  storeGame: VoidFunction = () => {
    this.history.push(game.toString());
    this.history.sort((n1, n2) => (n1 > n2 ? 1 : n1 == n2 ? 0 : -1));
    localStorage.setItem('log', this.history.join('\n') ?? []);
  };

  importFromServer: (games: string[]) => void = games => {
    const h1 = gameHistory.history;
    h1.push(...games.filter(x => !h1.includes(x)));
    const h2 = h1.sort((n1, n2) => (n1 > n2 ? 1 : n1 == n2 ? 0 : -1));
    gameHistory.history = h2;
    gameHistory.storeGame();
  };

  readDate: (x: string) => string | undefined = x => {
    if (x == 'NaN') return undefined;
    const min = Date.parse('03/03/2021');
    const max = Date.now();
    let d = Date.parse(x);
    if (isNaN(d) || d < min || d > max) {
      d = Number.parseInt(x) * 1000;
    }
    if (isNaN(d) || d < min || d > max) {
      d = Number.parseInt(x, 36);
    }
    if (isNaN(d) || d < min || d > max) {
      console.log('Unknown date ' + x);
      return undefined;
    }
    return d.toString(36);
  };

  readGame: (x: string) => string | undefined = x => {
    const s = x.split(';');
    const date = this.readDate(s[0]);
    if (!date) return undefined;
    if (s.length == 6) {
      return date + ';' + s[1] + ';' + s[2] + ';' + s[3] + ';' + s[4] + ';' + s[5];
    } else if (s.length == 4) {
      return date + ';' + s[1] + ';' + s[2] + ';0;0;' + s[3];
    } else {
      console.log('Unknown format ' + x);
    }
    return undefined;
  };

  downloadPlayer: (name: string) => string = name => {
    const txt: string[] = [];
    this.history.forEach(line => {
      const cols = line.split(';');
      if (cols[1] == name || cols[2] == name) {
        const time = new Date(Number.parseInt(cols[0], 36));
        cols[0] = time.toISOString();
        txt.push(cols.join(';'));
      }
    });
    return txt.join('\r\n');
  };

  upload: (text: string) => void = text => {
    const lines = text.replace(/\r/gi, '').split('\n');
    const games = lines.map(x => this.readGame(x)).filter(x => x) as string[];
    const h1 = this.history;
    games.forEach(game => {
      const key = game.split(';')[0];
      const find = h1.find(x => x.split(';')[0] == key);
      if (!find) this.history.push(game);
    });
    this.storeGame();
  };

  getFilteredGames: (name: string) => string[] = (name: string) =>
    gameHistory.history.filter(x => {
      const s = x.split(';');
      return s[1] == name || s[2] == name;
    });

  private loadHistory() {
    const h1 = localStorage.getItem('log')?.replace(/\r/, '').split('\n') ?? [];
    const h2 = h1.map(x => this.readGame(x)).filter(x => x) as string[];
    h2.sort((n1, n2) => (n1 > n2 ? 1 : n1 == n2 ? 0 : -1));
    return h2;
  }
}

export const gameHistory = new GameHistory();
