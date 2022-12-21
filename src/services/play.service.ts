import { Human } from '../model/human';
import { timer } from '../model/timer';
import { San } from './openings.service';
import { makeAutoObservable, runInAction } from 'mobx';
import { Chess, Square, WHITE } from 'chess.js';
import { Clock } from '../model/clock';
import { BotRunner } from './bot.service';
import {
  analyzerService,
  botService,
  configService,
  chessRulesService as chess,
  gameState,
  historyService,
  messageService,
  mp4service,
  openingsService,
  storageService,
} from './index.service';
import { jsonIgnore } from 'json-ignore';
import { FEN } from '../model/fen';
import { refreshtimer } from './control/refreshtimer';

/*
 * Everything about the current game (can be restored when returning to browser later)
 */
export class PlayService {
  static storage = 'play';
  wtime = 0;
  btime = 0;
  log: string[] = [];
  fen = FEN.NEW_GAME;

  // runtime does not need persisting
  private chess = Chess(this.fen);
  @jsonIgnore() isWhiteTurn = true;
  @jsonIgnore() isComplete = false;
  @jsonIgnore() private bplayer?: BotRunner;
  @jsonIgnore() private wplayer?: BotRunner;
  @jsonIgnore() private clock?: Clock;
  @jsonIgnore() allowed = 0;
  @jsonIgnore() isPlaying = false;
  @jsonIgnore() pgns: Square[] = [];

  private date = Date.now();

  constructor() {
    makeAutoObservable(this);
    const restore = storageService.restoreObject(PlayService.storage, {
      wtime: 0,
      btime: 0,
      log: [],
      fen: FEN.NEW_GAME,
    });
    this.wtime = restore.wtime;
    this.btime = restore.btime;
    this.log = restore.log;
    this.fen = restore.fen;
    this.calculate();
  }

  store: VoidFunction = () => {
    storageService.storeObject(PlayService.storage, this);
  };

  private calculate() {
    const san = this.log[this.log.length - 1];
    this.chess = Chess(this.fen);
    this.isComplete = chess.isEndMove(san) || this.chess.game_over();
    if (this.isComplete) {
      if (this.isPlaying) {
        mp4service.playWinner();
      }
      this.isPlaying = false;
    }
    this.clock =
      configService.clocks.find(p => p.getName() == configService.clock) || new Clock('', []);
    this.allowed = this.clock.getAllowed(this.log.length / 2);
    this.isWhiteTurn = this.chess.turn() === WHITE;
    this.pgns = this.calculatePgns();
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
    this.fen = FEN.NEW_GAME;
    this.isWhiteTurn = true;
    this.isComplete = false;
    analyzerService.reset();
    this.run();
  };

  initBots: VoidFunction = () => {
    const players = [...configService.humans, ...configService.bots];
    const w = players.find(p => p.getName() == configService.white);
    this.wplayer = botService.instantiate(w, this.wplayer);
    const b = players.find(p => p.getName() == configService.black);
    this.bplayer = botService.instantiate(b, this.bplayer);
  };

  addMove: (san: string) => void = san => {
    const prev = this.nextPlayer();
    if (prev instanceof Human) this.isPlaying = true;
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
    if (this.isPlaying) {
      this.runBot();
    }
  };

  runBot: VoidFunction = () => {
    const next = this.nextPlayer();
    if (next instanceof BotRunner) {
      next.processFen(this.fen, ({ from, to }) => {
        const move = chess.move(this.fen, from, to);
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
    runInAction(() => {
      this.addMove(san);
      this.store();
      if (this.isComplete) {
        historyService.storeGame();
      }
    });
    this.playAction();
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
    this.isPlaying = false;
  };

  playAction = () => {
    this.isPlaying = true;
    this.runBot();
  };

  whoWon = () => chess.whoWon(this.log);

  // ****************************
  // Actions
  // ****************************

  setPlaying(play: boolean) {
    runInAction(() => {
      this.isPlaying = play;
      if (play) {
        this.runBot();
      }
    });
  }

  initGame(useLog: string[]) {
    runInAction(() => {
      this.log = useLog;
      this.fen = chess.replay(this.log);
      this.clearAnalyzer();
    });
  }

  undoTo(mark: number) {
    runInAction(() => {
      this.setPlaying(false);
      gameState.setMarkLog(mark);
      const pos = mark >= 0 ? mark : this.log.length;
      this.fen = chess.replay(this.log, pos);
      this.clearAnalyzer();
    });
  }
  private clearAnalyzer() {
    refreshtimer.startRefreshTimer();
    analyzerService.cp = 0;
    analyzerService.help = [];
  }

  loadGame() {
    runInAction(() => {
      const games = historyService.history;
      const moves = games[historyService.markHist].split(';')[5].split(' ');
      this.log = moves;
      const mark = moves.length - 1;

      gameState.setMarkLog(mark);
      this.fen = chess.replay(moves, mark);
    });
  }
}
