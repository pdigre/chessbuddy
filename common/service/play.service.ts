import { Human } from '../model/human';
import { San } from './openings.service';
import { action, makeObservable, observable } from 'mobx';
import { Chess, Square, WHITE } from 'chess.js';
import { Clock } from '../model/clock';
import { BotRunner } from './bot.service';
import {
  analyzerService,
  botService,
  clockService,
  configService,
  dashboardService,
  editService,
  historyService,
  mediaService,
  messageService,
  openingsService,
  renderingService,
  rulesService,
  storageService,
} from './index.service';
import { FEN } from '../model/fen';
import {toMMSS} from "./clock.service.ts";
import { Play } from '../model/play.ts';

/*
 * Everything about the current game (can be restored when returning to browser later)
 */
export class PlayService extends Play{

  // runtime does not need persisting
  private chess = new Chess(this.fen);
  isWhiteTurn = true;
  isComplete = false;
  private bplayer?: BotRunner;
  private wplayer?: BotRunner;
  private clock?: Clock;
  allowed = 0;
  isPlaying = false;
  pgns: Square[] = [];

  constructor() {
    super();
    makeObservable(this,{
      wtime: observable,
      btime: observable,
      log: observable,
      fen: observable,
    });
    storageService.load(this);
    this.calculate();
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
      configService.clocks.find(p => p.getName() == configService.game.clock) || new Clock('', []);
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

  readonly resetGameAction: VoidFunction = action(() => {
    this.wtime = 0;
    this.btime = 0;
    this.log = [];
    this.fen = FEN.NEW_GAME;
    this.isWhiteTurn = true;
    this.isComplete = false;
    analyzerService.reset();
    this.run();
  });

  initBots() {
    const players = [...configService.humans, ...configService.bots];
    const w = players.find(p => p.getName() == configService.game.white);
    this.wplayer = botService.instantiate(w, this.wplayer);
    const b = players.find(p => p.getName() == configService.game.black);
    this.bplayer = botService.instantiate(b, this.bplayer);
  }

  addMove(san: string) {
    const prev = this.nextPlayer();
    if (prev instanceof Human) this.isPlaying = true;
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
    storageService.save(this);
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
    storageService.save(this);
    if (this.isComplete) {
      historyService.storeGame();
    }
    this.playContinue();
  }

  recordScore(whoWon: string) {
    switch (whoWon) {
      case 'w':
        this.playMove('1-0');
        break;
      case 'b':
        this.playMove('0-1');
        break;
      case 'draw':
        this.playMove('1/2-1/2');
        break;
    }
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
    renderingService.startRefreshTimer();
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
  startGameAction: VoidFunction = action(() => {
    storageService.save(configService);
    configService.closeConfigAction();
    configService.showConfig = false;
    this.playContinue();
  });

  editGameAction = action(() => {
    storageService.save(configService);
    editService.editStart(this.fen);
  });

  endGameAction = action(() => {
    const winner = this.whoWon();
    if (winner) {
      messageService.display({
        name: 'ended',
        title: 'Game has ended',
        msg: winner != 'Draw' ? winner + ' won this game' : 'The game was a draw',
      });
    } else {
      messageService.standard('end', reply => this.recordScore(reply));
    }
  });

  // Board actions

  pieceStart = (from: Square): any => {
    const player = this.nextPlayer();
    if (player instanceof Human && !this.isComplete) {
      const movable = this.isMoveable(from);
      if (movable) {
        mediaService.sound_click.play().then();
      }
      return movable;
    }
    return false;
  };

  pieceMove(from: Square, to: Square) {
    if (
      analyzerService.help.length > 1 &&
      analyzerService.help[0] == to &&
      analyzerService.help[1] == from
    ) {
      mediaService.playCorrect();
    }
    dashboardService.startUndoTimer(this.log.length);
    const state = this.log.length;
    this.move(from, to, true);
    const isOk = state != this.log.length;
    isOk ? mediaService.soundMove() : mediaService.soundError();
    return isOk;
  }

  move(from: Square, to: Square, isHuman: boolean) {
    const move = rulesService.move(this.fen, from, to);
    if (!move) {
      return;
    }
    if (this.isPlaying || isHuman) {
      const action = move[1];
      if (action.promotion && isHuman) {
        messageService.standard('promotion', promo => {
          const move = rulesService.move(this.fen, from, to, promo as 'b' | 'q' | 'n' | 'r');
          if (move != null) {
            this.playMove(move[1].san);
          }
        });
      } else {
        this.playMove(action.san);
      }
    }
  }

  markEdit(func: VoidFunction) {
    if (editService.showEdit && editService.editSquare != '') func();
  }
  markFacts(func: (x: Square) => void) {
    if (configService.display.showFacts) {
      this.pgns.forEach(x => func(x));
    }
  }
  markHints(func: (x: Square, i: number) => void) {
    if (configService.display.showFacts) {
      analyzerService.help.forEach((x, i) => func(x, i));
    }
  }
  markCastling(func: (x: Square) => void) {
    rulesService.getCastlingSquares(this.fen).forEach(x => func(x));
  }

  // Log / History Panel

  playButtonAction: VoidFunction = action(() => {
    const isHistUndo = !dashboardService.showHist && dashboardService.markLog >= 0;
    const isPlayUndo = this.isPlaying && dashboardService.showUndo;
    if (this.isComplete) this.resetGameAction();
    if (isHistUndo || isPlayUndo) {
      messageService.standard(isPlayUndo ? 'undo' : 'revert', reply => {
        if (reply == 'Yes') {
          this.initGame(
            this.log.slice(0, isPlayUndo ? dashboardService.undopos : dashboardService.markLog)
          );
        }
        dashboardService.setMarkLog(-1);
      });
      return;
    }
    this.setPlaying(!this.isPlaying);
  });

  // PlayerInfo
  getStartTime = () => Math.floor(this.isWhiteTurn ? this.wtime : this.btime);

  getPlayerInfo(isTop: boolean) {
    const isWhite = isTop == renderingService.rotation > 1;
    const otherTime = isWhite ? this.wtime : this.btime;
    return {
      other: toMMSS(this.allowed ? this.allowed - otherTime : otherTime),
      label: isWhite ? `White: ${configService.game.white}` : `Black: ${configService.game.black}`,
      showTicker: isWhite == this.isWhiteTurn,
      banner: isWhite != this.isWhiteTurn && this.isComplete ? ' ** Winner **' : '',
      isTextRight: isTop && renderingService.rotation % 2 == 1,
    };
  }
}
