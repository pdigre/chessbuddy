import { Human } from '../model/human';
import { San } from './openings.service';
import { makeAutoObservable } from 'mobx';
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
  mediaService,
  openingsService,
  storageService,
  refreshService,
  clockService,
  editService,
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
  private chess = new Chess(this.fen);
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

  store() {
    storageService.storeObject(PlayService.storage, this);
  }

  private calculate() {
    const san = this.log[this.log.length - 1];
    this.chess = new Chess(this.fen);
    this.isComplete = rulesService.isEndMove(san) || this.chess.isGameOver();
    if (this.isComplete) {
      if (this.isPlaying) {
        mediaService.playWinner();
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
    try {
      const sqs = sans
        .filter(san => san.san)
        .map(san => {
          return new Chess(this.fen).move(san.san);
        })
        .flatMap(move => (move ? [move.from, move.to] : []));
      return Array.from(new Set(sqs).values());
    } catch (error) {
      return [];
    }
  }

  readonly isMoveable = (from: Square): boolean => this.chess.moves({ square: from }).length > 0;

  readonly resetGameAction: VoidFunction = () => {
    this.wtime = 0;
    this.btime = 0;
    this.log = [];
    this.fen = FEN.NEW_GAME;
    this.isWhiteTurn = true;
    this.isComplete = false;
    analyzerService.reset();
    this.run();
  };

  initBots() {
    const players = [...configService.humans, ...configService.bots];
    const w = players.find(p => p.getName() == configService.white);
    this.wplayer = botService.instantiate(w, this.wplayer);
    const b = players.find(p => p.getName() == configService.black);
    this.bplayer = botService.instantiate(b, this.bplayer);
  }

  addMove(san: string) {
    const prev = this.nextPlayer();
    if (prev instanceof Human) this.isPlaying = true;
    this.date = Date.now();
    this.log.push(san);
    analyzerService.reset();
    this.fen = rulesService.newFen(this.fen, san);
    if (this.isWhiteTurn) {
      this.wtime += clockService.elapsed;
    } else {
      this.btime += clockService.elapsed;
    }
    clockService.reset();
    this.run();
  }

  run() {
    clockService.reset();
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
  }

  runBot() {
    const next = this.nextPlayer();
    if (next instanceof BotRunner) {
      next.processFen(this.fen, ({ from, to }) => {
        const move = rulesService.move(this.fen, from, to);
        if (move) {
          this.playMove(move[1].san);
        }
      });
    }
  }

  readonly nextPlayer: () => BotRunner | Human | undefined = () =>
    this.isWhiteTurn ? this.wplayer : this.bplayer;

  playMove(san: string) {
    this.addMove(san);
    this.store();
    if (this.isComplete) {
      historyService.storeGame();
    }
    this.playContinue();
  }

  recordScore(yes: string) {
    if (yes.startsWith('White')) {
      this.playMove('1-0');
    } else if (yes.startsWith('Black')) {
      this.playMove('0-1');
    } else if (yes == 'Draw') {
      this.playMove('1/2-1/2');
    }
    messageService.clear();
  }

  outOfTime() {
    this.playMove(this.isWhiteTurn ? '1-0' : '0-1');
    this.isPlaying = false;
  }

  playContinue() {
    this.isPlaying = true;
    this.runBot();
  }

  readonly whoWon = () => rulesService.whoWon(this.log);

  // ****************************
  // Actions
  // ****************************

  setPlaying(play: boolean) {
    this.isPlaying = play;
    if (play) {
      this.runBot();
    }
  }

  initGame(useLog: string[]) {
    this.log = useLog;
    this.fen = rulesService.replay(this.log);
    this.clearAnalyzer();
  }

  undoTo(mark: number) {
    this.setPlaying(false);
    dashboardService.setMarkLog(mark);
    const pos = mark >= 0 ? mark : this.log.length;
    this.fen = rulesService.replay(this.log, pos);
    this.clearAnalyzer();
  }
  private clearAnalyzer() {
    refreshService.startRefreshTimer();
    analyzerService.cp = 0;
    analyzerService.help = [];
  }

  loadGame() {
    const games = historyService.history;
    const moves = games[historyService.markHist].split(';')[5].split(' ');
    this.log = moves;
    const mark = moves.length - 1;
    dashboardService.setMarkLog(mark);
    this.fen = rulesService.replay(moves, mark);
  }

  // Game config actions
  startGameAction: VoidFunction = () => {
    configService.store();
    configService.closeConfigAction();
    configService.showConfig = false;
    this.playContinue();
  };

  readonly editGameAction = () => {
    configService.store();
    editService.editStart(this.fen);
  };

  readonly endGameAction = () => {
    const winner = this.whoWon();
    if (winner) {
      messageService.display(
        'Game has ended',
        winner != 'Draw' ? winner + ' won this game' : 'The game was a draw'
      );
    } else {
      const white = configService.white.split(' ')[0];
      const black = configService.black.split(' ')[0];
      messageService.display('End game', 'Who won', WINNER_BUTTONS(black, white), this.recordScore);
    }
  };

  // Board actions

  readonly onDragStartAction = (piece: string, from: Square) => {
    const r90 = configService.rotation % 2 == 1;
    if (editService.showEdit) return true;
    const player = this.nextPlayer();
    if (player instanceof Human && !this.isComplete) {
      const from2 = r90 ? rulesService.leftSquare(from) : from;
      const movable = this.isMoveable(from2);
      if (movable) {
        mediaService.sound_click.play().then();
      }
      return movable;
    }
    return false;
  };

  readonly onPieceDropAction = (from: Square, to: Square) => {
    if (editService.showEdit) {
      editService.editMove(from, to);
      return true;
    }
    const r90 = configService.rotation % 2 == 1;
    if (
      analyzerService.help.length > 1 &&
      analyzerService.help[0] == to &&
      analyzerService.help[1] == from
    ) {
      mediaService.playCorrect();
    }
    dashboardService.startUndoTimer(this.log.length);
    const state = this.log.length;
    const m1 = r90 ? rulesService.leftSquare(from) : from;
    const m2 = r90 ? rulesService.leftSquare(to) : to;
    this.move(m1, m2, true);
    state != this.log.length ? mediaService.soundMove() : mediaService.soundError();
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

  readonly onSquareClickAction = (square: Square) => editService.onSquareClick(square);

  markEdit(func: VoidFunction) {
    if (editService.showEdit && editService.editSquare != '') func();
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

  readonly playButtonAction: VoidFunction = () => {
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

  // PlayerInfo
  readonly getStartTime = () => Math.floor(this.isWhiteTurn ? this.wtime : this.btime);

  getPlayerInfo(isTop: boolean) {
    const isWhite = isTop == configService.rotation > 1;
    const otherTime = isWhite ? this.wtime : this.btime;
    return {
      other: toMMSS(this.allowed ? this.allowed - otherTime : otherTime),
      label: isWhite ? `White: ${configService.white}` : `Black: ${configService.black}`,
      showTicker: isWhite == this.isWhiteTurn,
      banner: isWhite != this.isWhiteTurn && this.isComplete ? ' ** Winner **' : '',
      isTextRight: isTop && configService.rotation % 2 == 1,
    };
  }
}
