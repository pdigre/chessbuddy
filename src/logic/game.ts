import * as rules from './rules';
import { Human, players } from './players';
import { Player } from './player';
import { clock } from './clock';
import { locate, San, tree } from './openings';
import { makeAutoObservable } from 'mobx';
import { helper } from './helper';
import { Bot } from './bots';
import { playWinner } from './mp4';
import { Square } from 'chess.js';
import { gameHistory } from './history';
import { message } from './message';
import { config } from './config';

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
      this.wtime += clock.elapsed;
    } else {
      this.btime += clock.elapsed;
    }
    clock.reset();
    this.run();
  };
  run: VoidFunction = () => {
    clock.reset();
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
