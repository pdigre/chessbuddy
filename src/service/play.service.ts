import { Human } from '../model/human';
import { San } from './openings.service';
import { makeAutoObservable, runInAction } from 'mobx';
import { Chess, Square, WHITE } from 'chess.js';
import { Clock } from '../model/clock';
import { toMMSS } from '../resources/library';
import { BotRunner } from './bot.service';
import {
  analyzerService,
  botService,
  configService,
  rulesService,
  dashboardService,
  historyService,
  messageService,
  mp4service,
  openingsService,
  storageService,
  refreshService,
  timerService,
} from './index.service';
import { jsonIgnore } from 'json-ignore';
import { FEN } from '../model/fen';
import { PROMOTE_BUTTONS, WINNER_BUTTONS, WINNER_HTML, YESNO_BUTTONS } from '../view/MessageDialog';

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
    this.isComplete = rulesService.isEndMove(san) || this.chess.game_over();
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

  resetGameAction: VoidFunction = () => {
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
    this.fen = rulesService.newFen(this.fen, san);
    if (this.isWhiteTurn) {
      this.wtime += timerService.elapsed;
    } else {
      this.btime += timerService.elapsed;
    }
    timerService.reset();
    this.run();
  };

  run: VoidFunction = () => {
    timerService.reset();
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
        const move = rulesService.move(this.fen, from, to);
        if (move) {
          this.playMove(move[1].san);
        }
      });
    }
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

  whoWon = () => rulesService.whoWon(this.log);

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
      this.fen = rulesService.replay(this.log);
      this.clearAnalyzer();
    });
  }

  undoTo(mark: number) {
    runInAction(() => {
      this.setPlaying(false);
      dashboardService.setMarkLog(mark);
      const pos = mark >= 0 ? mark : this.log.length;
      this.fen = rulesService.replay(this.log, pos);
      this.clearAnalyzer();
    });
  }
  private clearAnalyzer() {
    refreshService.startRefreshTimer();
    analyzerService.cp = 0;
    analyzerService.help = [];
  }

  loadGame() {
    runInAction(() => {
      const games = historyService.history;
      const moves = games[historyService.markHist].split(';')[5].split(' ');
      this.log = moves;
      const mark = moves.length - 1;
      dashboardService.setMarkLog(mark);
      this.fen = rulesService.replay(moves, mark);
    });
  }

  // Game config actions
  startGameAction: VoidFunction = () => {
    configService.store();
    configService.closeConfig();
    runInAction(() => {
      configService.showConfig = false;
      this.playAction();
    });
  };

  editGameAction: VoidFunction = () => {
    configService.store();
    dashboardService.editStart();
  };

  endGameAction = () => {
    const winner = this.whoWon();
    if (winner) {
      messageService.display(
        'Game has ended',
        winner != 'Draw' ? winner + ' won this game' : 'The game was a draw'
      );
    } else {
      const white = configService.white.split(' ')[0];
      const black = configService.black.split(' ')[0];
      messageService.display(
        'End game',
        WINNER_HTML,
        WINNER_BUTTONS(black, white),
        this.recordScore
      );
    }
  };

  // Board actions
  sound_click = new Audio('/mp3/click.mp3');
  sound_move = new Audio('/mp3/move1.mp3');
  sound_error = new Audio('/mp3/buzzer.mp3');

  onDragStart = (piece: string, from: Square) => {
    const r90 = configService.rotation % 2 == 1;
    if (dashboardService.showEdit) return true;
    const player = this.nextPlayer();
    if (player instanceof Human && !this.isComplete) {
      const from2 = r90 ? rulesService.leftSquare(from) : from;
      const movable = this.isMoveable(from2);
      if (movable) {
        this.sound_click.play().then();
      }
      return movable;
    }
    return false;
  };

  onPieceDrop = (from: Square, to: Square) => {
    if (dashboardService.showEdit) {
      dashboardService.editMove(from, to);
      return true;
    }
    const r90 = configService.rotation % 2 == 1;
    if (
      analyzerService.help.length > 1 &&
      analyzerService.help[0] == to &&
      analyzerService.help[1] == from
    ) {
      mp4service.playCorrect();
    }
    dashboardService.startUndoTimer(this.log.length);
    const state = this.log.length;
    const m1 = r90 ? rulesService.leftSquare(from) : from;
    const m2 = r90 ? rulesService.leftSquare(to) : to;
    this.move(m1, m2, true);
    if (state != this.log.length) {
      this.sound_move.play().then();
    } else {
      this.sound_error.play().then();
    }
    return true;
  };

  move(from: Square, to: Square, isHuman: boolean) {
    const move = rulesService.move(this.fen, from, to);
    if (!move) {
      return;
    }
    if (this.isPlaying || isHuman) {
      const action = move[1];
      if (action.promotion && isHuman) {
        messageService.display('Promotion', 'Choose promotion piece', PROMOTE_BUTTONS, reply => {
          let promo: 'b' | 'q' | 'n' | 'r' = 'q';
          if (reply == 'Rook') promo = 'r';
          if (reply == 'Knight') promo = 'n';
          if (reply == 'Bishop') promo = 'b';
          const move = rulesService.move(this.fen, from, to, promo);
          if (move != null) {
            messageService.clear();
            this.playMove(move[1].san);
          }
        });
      } else {
        this.playMove(action.san);
      }
    }
  }

  onSquareClick(square: Square) {
    if (dashboardService.showEdit) {
      runInAction(() => (dashboardService.editSquare = square));
    }
  }

  markEdit(func: VoidFunction) {
    if (dashboardService.showEdit && dashboardService.editSquare != '') func();
  }
  markFacts(func: (x: Square) => void) {
    if (configService.showFacts) {
      this.pgns.forEach(x => func(x));
    }
  }
  markHints(func: (x: Square, i: number) => void) {
    if (configService.showFacts) {
      analyzerService.help.forEach((x, i) => func(x, i));
    }
  }
  markCastling(func: (x: Square) => void) {
    rulesService.getCastlingSquares(this.fen).forEach(x => func(x));
  }

  // Log / History Panel

  playButtonHandler: VoidFunction = () => {
    const isHistUndo = !dashboardService.showHist && dashboardService.markLog >= 0;
    const isPlayUndo = this.isPlaying && dashboardService.showUndo;
    if (this.isComplete) this.resetGameAction();
    if (isHistUndo || isPlayUndo) {
      messageService.display(
        'Undo',
        isPlayUndo
          ? 'Do you want to undo last move?'
          : 'Do you want to revert the game to the marked position?',
        YESNO_BUTTONS,
        yes => {
          messageService.clear();
          if (yes == 'Yes') {
            this.initGame(
              this.log.slice(0, isPlayUndo ? dashboardService.undopos : dashboardService.markLog)
            );
          }
          dashboardService.setMarkLog(-1);
        }
      );
      return;
    }
    this.setPlaying(!this.isPlaying);
  };

  enterLogCheck = () => {
    if (historyService.markHist >= 0) {
      if (this.isComplete || this.log.length == 0) {
        messageService.display(
          'Load game',
          'Do you want to look at this game?',
          YESNO_BUTTONS,
          reply => {
            if (reply == 'Yes') {
              this.loadGame();
            }
            messageService.clear();
          }
        );
      } else {
        messageService.display('Load game', 'You have to end current game to load previous games', [
          { label: 'Ok' },
        ]);
      }
      historyService.setMarkHist(-1);
    }
  };

  getLogRows = () => {
    const rows: string[][] = [];
    const log = this.log;
    for (let i = 0; i < log.length / 2; i++) {
      rows[i] = ['', ''];
    }
    log.forEach((t, i) => {
      const l = Math.floor(i / 2),
        c = i % 2;
      rows[l][c] = t;
    });
    return rows;
  };

  // PlayerInfo

  getTimerText = (elapsed: number) => {
    const sound_click = new Audio('/mp3/click.mp3');
    const sound_error = new Audio('/mp3/buzzer.mp3');
    const startTime = Math.floor(this.isWhiteTurn ? this.wtime : this.btime);
    const current = Math.floor(elapsed) + startTime;
    if (!this.allowed) {
      return current;
    }
    const remains = this.allowed - current;
    if (remains < 11) {
      sound_click.play().then();
    }
    if (remains < 0) {
      sound_error.play().then();
      this.outOfTime();
    }
    return toMMSS(this.allowed - current);
  };

  getPlayerInfo = (isTop: boolean) => {
    const isWhite = isTop == configService.rotation > 1;
    const otherTime = isWhite ? this.wtime : this.btime;
    return {
      other: toMMSS(this.allowed ? this.allowed - otherTime : otherTime),
      label: isWhite ? `White: ${configService.white}` : `Black: ${configService.black}`,
      showTicker: isWhite == this.isWhiteTurn,
      banner: isWhite != this.isWhiteTurn && this.isComplete ? ' ** Winner **' : '',
      isTextRight: isTop && configService.rotation % 2 == 1,
    };
  };
}
