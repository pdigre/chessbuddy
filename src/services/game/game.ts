import { Human } from '../../model/human';
import { clockList } from '../../model/timer';
import { openingsService, San } from '../openings.service';
import { makeAutoObservable } from 'mobx';
import { analyzerService } from '../analyzer.service';
import { mp4service } from '../mp4.service';
import { Square, SQUARES } from 'chess.js';
import { historyService } from '../history.service';
import { messageService } from '../message.service';
import { config } from '../../model/config';
import { Clock } from '../../model/clock';
import { BotRunner, botService } from '../bot.service';
import { chessRulesService as chess } from '../chessrules.service';

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
  clock = '';
  wtime = 0;
  btime = 0;
  log: string[] = [];
  fen = chess.NEW_GAME;
  isWhiteTurn = true;
  isComplete = false;
  pgns: Square[] = [];
  private bplayer?: BotRunner | Human;
  private wplayer?: BotRunner | Human;
  private _clock?: Clock;
  private date = Date.now();

  constructor() {
    makeAutoObservable(this);
    this.restoreFromLocalStorage();
  }

  reset: VoidFunction = () => {
    this.wtime = 0;
    this.btime = 0;
    this.log = [];
    this.fen = chess.NEW_GAME;
    this.isWhiteTurn = true;
    this.isComplete = false;
    analyzerService.reset();
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
    const brd = chess.getBrd(this.fen).split('');
    const p1 = SQUARES.indexOf(from);
    const p2 = SQUARES.indexOf(to);
    const swap = brd[p1];
    brd[p1] = brd[p2];
    brd[p2] = swap;
    fenArr[0] = chess.brd2fen(brd.join(''));
    this.fen = fenArr.join(' ');
  };

  editPiece = (piece: string) => {
    const fenArr = this.fen.split(' ');
    const brd = chess.getBrd(this.fen).split('');
    const p = SQUARES.indexOf(config.editSquare as Square);
    brd[p] = piece;
    fenArr[0] = chess.brd2fen(brd.join(''));
    this.fen = fenArr.join(' ');
  };

  setPlayers: (white: string, black: string) => void = (white, black) => {
    this.white = white;
    this.black = black;
    const players = [...config.humans, ...config.bots];
    this.wplayer = botService.instantiate(players.find(p => p.getName() == white));
    this.bplayer = botService.instantiate(players.find(p => p.getName() == black));
  };

  addMove: (san: string) => void = san => {
    const prev = this.nextPlayer();
    if (prev instanceof Human) gameState.isPlaying = true;
    this.date = Date.now();
    this.log.push(san);
    analyzerService.reset();
    this.fen = chess.newFen(this.fen, san);
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
    if (!(next instanceof BotRunner)) {
      analyzerService.run(this.fen, this.isWhiteTurn);
    }
    gameState.run();
  };

  playBot: VoidFunction = () => {
    const next = this.nextPlayer();
    if (next instanceof BotRunner) {
      next.processFen(this.fen, ({ from, to }) => {
        const move = chess.move(game.fen, from, to);
        if (move) {
          this.playMove(move[1].san);
        }
      });
    }
  };

  setPGNS: (sans: San[]) => void = sans => {
    this.pgns = chess.findInfoMarkers(
      sans.map(x => x.san),
      this.fen
    );
  };

  nextPlayer: () => BotRunner | Human | undefined = () => {
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
    this.fen = chess.replay(this.log);
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
      historyService.storeGame();
    }
  };

  private calculate = () => {
    const san = this.log[this.log.length - 1];
    this.isComplete = chess.isEndMove(san) || chess.isGameOver(this.fen);
    if (this.isComplete) {
      if (gameState.isPlaying) mp4service.playWinner();
      gameState.isPlaying = false;
    }
    this.isWhiteTurn = chess.isWhiteTurn(this.fen);
    this.pgns = [];
    if (this.log.length == 0) {
      this.setPGNS(openingsService.tree);
    } else {
      const pgn: San | undefined = openingsService.locate(this.log);
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
    messageService.clear();
  };

  playAction = () => {
    config.showTab = -1;
    gameState.isPlaying = true;
    gameState.run();
  };

  whoWon = () => chess.whoWon(game.log);
}

export const game = new Game();
