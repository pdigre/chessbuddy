import * as rules from '../util/rules';
import { Human } from './player_human';
import { Player } from './player';
import { playerList } from './playerlist';
import { clockList } from '../config/clocklist';
import { locate, San, tree } from '../util/openings';
import { makeAutoObservable } from 'mobx';
import { helper } from './helper';
import { Bot } from './player_bot';
import { playWinner } from '../config/mp4';
import { Square } from 'chess.js';
import { gameHistory } from './history';
import { message } from '../control/message';
import { config } from '../config/config';

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
  pgns: Square[] = [];
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

  edit: VoidFunction = () => {
    config.editMode = true;
    config.showTab = -1;
  };

  editDone = (wcck: boolean, wccq: boolean, bcck: boolean, bccq: boolean, bf: boolean) => {
    const fenArr = this.fen.split(' ');
    fenArr[1] = bf ? 'b' : 'w';
    fenArr[2] = (wcck ? 'K' : '') + (wccq ? 'Q' : '') + (bcck ? 'k' : '') + (bccq ? 'q' : '');
    this.fen = fenArr.join(' ');
    config.editMode = false;
    config.showTab = 0;
  };

  editMove = (from: Square, to: Square) => {
    const fenArr = this.fen.split(' ');
    const brd = rules.getBrd(this.fen).split('');
    const p1 = rules.SQUARES.indexOf(from);
    const p2 = rules.SQUARES.indexOf(to);
    const swap = brd[p1];
    brd[p1] = brd[p2];
    brd[p2] = swap;
    fenArr[0] = rules.brd2fen(brd.join(''));
    this.fen = fenArr.join(' ');
  };

  editPiece = (piece: string) => {
    const fenArr = this.fen.split(' ');
    const brd = rules.getBrd(this.fen).split('');
    const p = rules.SQUARES.indexOf(config.editSquare as Square);
    brd[p] = piece;
    fenArr[0] = rules.brd2fen(brd.join(''));
    this.fen = fenArr.join(' ');
  };

  setPlayers: (white: string, black: string) => void = (white, black) => {
    this.white = white;
    this.black = black;
    this.wplayer = playerList.players.find(p => p.name == white);
    this.bplayer = playerList.players.find(p => p.name == black);
  };

  addMove: (san: string) => void = san => {
    const prev = this.nextPlayer();
    if (prev instanceof Human) gameState.isPlaying = true;
    this.date = Date.now();
    this.log.push(san);
    helper.reset();
    this.fen = rules.newFen(this.fen, san);
    if (this.isWhiteTurn) {
      this.wtime += clockList.elapsed;
    } else {
      this.btime += clockList.elapsed;
    }
    clockList.reset();
    this.run();
  };
  run: VoidFunction = () => {
    clockList.reset();
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
      next.processFen(this.fen, ({ from, to }) => {
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
      if (gameState.isPlaying) playWinner();
      gameState.isPlaying = false;
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

  recordScore: (ok: string) => void = yes => {
    if (yes.startsWith('White')) {
      game.playMove('1-0');
    } else if (yes.startsWith('Black')) {
      game.playMove('0-1');
    } else if (yes == 'Draw') {
      game.playMove('1/2-1/2');
    }
    message.clear();
  };

  playAction = () => {
    config.showTab = -1;
    gameState.isPlaying = true;
    gameState.run();
  };

  whoWon = () => rules.whoWon(game.log);
}

export const game = new Game();