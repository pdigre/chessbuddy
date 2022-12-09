import { Human } from '../model/human';
import { timer } from '../model/timer';
import { openingsService, San } from './openings.service';
import { makeAutoObservable } from 'mobx';
import { analyzerService } from './analyzer.service';
import { mp4service } from './mp4.service';
import { BLACK, Chess, Move, Square, SQUARES, WHITE } from 'chess.js';
import { historyService } from './history.service';
import { messageService } from './message.service';
import { config } from '../model/config';
import { Clock } from '../model/clock';
import { BotRunner, botService } from './bot.service';
import { chessRulesService as chess, ChessRulesService } from './chessrules.service';
import { storage } from './storage.service';
import { jsonIgnore } from 'json-ignore';
import { FaThinkPeaks } from 'react-icons/fa';

/**
 * Start and pause of game, starts the bots if in turn
 * this does not need to be persisted
 */
export class GameState {
  showHist = false;
  showUndo = false;
  isPlaying = false;
  markLog = -1;
  undopos = 0;
  editMode = false;
  editSquare = '';
  pgns: Square[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  run: VoidFunction = () => {
    if (this.isPlaying) {
      playService.playBot();
    }
  };

  undoTimer: TimerHandler = () => {
    if (this.showUndo) {
      this.undopos = 0; // In the case you're already in a UNDO confirmation box.
    }
    this.showUndo = false;
  };

  startUndoTimer: (pos: number) => void = pos => {
    this.showUndo = true;
    this.undopos = pos;
    window.setTimeout(this.undoTimer, 9000);
  };
}

export const gameState = new GameState();

/*
 * Everything about the current game (can be restored when returning to browser later)
 */
export class PlayService {
  static storage = 'play';
  wtime = 0;
  btime = 0;
  log: string[] = [];
  fen = ChessRulesService.NEW_GAME;

  // runtime does not need persisting
  private chess = Chess(this.fen);
  @jsonIgnore() isWhiteTurn = true;
  @jsonIgnore() isComplete = false;
  @jsonIgnore() private bplayer?: BotRunner;
  @jsonIgnore() private wplayer?: BotRunner;
  @jsonIgnore() private clock?: Clock;
  @jsonIgnore() allowed = 0;
  private date = Date.now();

  constructor() {
    makeAutoObservable(this);
    const restore = storage.restoreObject(PlayService.storage, {
      wtime: 0,
      btime: 0,
      log: [],
      fen: ChessRulesService.NEW_GAME,
    });
    this.wtime = restore.wtime;
    this.btime = restore.btime;
    this.log = restore.log;
    this.fen = restore.fen;
    this.calculate();
  }

  store: VoidFunction = () => {
    storage.storeObject(PlayService.storage, this);
  };

  private calculate() {
    const san = this.log[this.log.length - 1];
    this.chess = Chess(this.fen);
    this.isComplete = chess.isEndMove(san) || this.chess.game_over();
    if (this.isComplete) {
      if (gameState.isPlaying) {
        mp4service.playWinner();
      }
      gameState.isPlaying = false;
    }
    this.clock = config.clocks.find(p => p.getName() == config.clock) || new Clock('', []);
    this.allowed = this.clock.getAllowed(this.log.length / 2);
    this.isWhiteTurn = this.chess.turn() === WHITE;
    gameState.pgns = this.calculatePgns();
  }

  private calculatePgns(): Square[] {
    if (this.log.length == 0) {
      return this.getPGNS(openingsService.tree);
    }
    const pgn: San | undefined = openingsService.locate(this.log);
    return pgn ? this.getPGNS(pgn.children) : [];
  }

  private getPGNS(sans: San[]): Square[] {
    const sqs = sans
      .map(san => Chess(this.fen).move(san.san))
      .flatMap(move => (move ? [move.from, move.to] : []));
    return Array.from(new Set(sqs).values());
  }

  isMoveable = (from: Square): boolean => this.chess.moves({ square: from }).length > 0;

  reset: VoidFunction = () => {
    this.wtime = 0;
    this.btime = 0;
    this.log = [];
    this.fen = ChessRulesService.NEW_GAME;
    this.isWhiteTurn = true;
    this.isComplete = false;
    analyzerService.reset();
    this.run();
  };

  editDone = (wcck: boolean, wccq: boolean, bcck: boolean, bccq: boolean, bf: boolean) => {
    const fenArr = this.fen.split(' ');
    fenArr[1] = bf ? BLACK : WHITE;
    fenArr[2] = (wcck ? 'K' : '') + (wccq ? 'Q' : '') + (bcck ? 'k' : '') + (bccq ? 'q' : '');
    this.fen = fenArr.join(' ');
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
    const p = SQUARES.indexOf(gameState.editSquare as Square);
    brd[p] = piece;
    fenArr[0] = chess.brd2fen(brd.join(''));
    this.fen = fenArr.join(' ');
  };

  initBots: VoidFunction = () => {
    const players = [...config.humans, ...config.bots];
    const w = players.find(p => p.getName() == config.white);
    this.wplayer = botService.instantiate(w, this.wplayer);
    const b = players.find(p => p.getName() == config.black);
    this.bplayer = botService.instantiate(b, this.bplayer);
  };

  addMove: (san: string) => void = san => {
    const prev = this.nextPlayer();
    if (prev instanceof Human) gameState.isPlaying = true;
    this.date = Date.now();
    this.log.push(san);
    analyzerService.reset();
    this.fen = chess.newFen(this.fen, san);
    if (this.isWhiteTurn) {
      this.wtime += timer.elapsed;
    } else {
      this.btime += timer.elapsed;
    }
    timer.reset();
    this.run();
  };

  run: VoidFunction = () => {
    timer.reset();
    if (!this.wplayer) {
      this.initBots();
    }
    this.calculate();
    const next = this.nextPlayer();
    if (!(next instanceof BotRunner)) {
      analyzerService.run(this.fen, this.isWhiteTurn);
    }
    this.store();
    gameState.run();
  };

  playBot: VoidFunction = () => {
    const next = this.nextPlayer();
    if (next instanceof BotRunner) {
      next.processFen(this.fen, ({ from, to }) => {
        const move = chess.move(playService.fen, from, to);
        if (move) {
          this.playMove(move[1].san);
        }
      });
    }
  };

  findCastlingMarkers = () => {
    const sqs: Square[] = [];
    const cc = this.fen.split(' ')[2];
    if (cc.includes('Q')) {
      sqs.push('a1');
    }
    if (cc.includes('K')) {
      sqs.push('h1');
    }
    if (cc.includes('q')) {
      sqs.push('a8');
    }
    if (cc.includes('k')) {
      sqs.push('h8');
    }
    return sqs;
  };

  nextPlayer: () => BotRunner | Human | undefined = () => {
    return this.isWhiteTurn ? this.wplayer : this.bplayer;
  };

  playMove: (san: string) => void = san => {
    this.addMove(san);
    this.store();
    if (this.isComplete) {
      historyService.storeGame();
    }
  };

  recordScore: (ok: string) => void = yes => {
    if (yes.startsWith('White')) {
      this.playMove('1-0');
    } else if (yes.startsWith('Black')) {
      this.playMove('0-1');
    } else if (yes == 'Draw') {
      this.playMove('1/2-1/2');
    }
    messageService.clear();
  };

  outOfTime = () => {
    this.playMove(this.isWhiteTurn ? '1-0' : '0-1');
    gameState.isPlaying = false;
  };

  playAction = () => {
    gameState.isPlaying = true;
    gameState.run();
  };

  whoWon = () => chess.whoWon(playService.log);
}

export const playService = new PlayService();
