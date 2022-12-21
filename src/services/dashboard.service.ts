import { makeAutoObservable, runInAction } from 'mobx';
import { BLACK, Square, SQUARES, WHITE } from 'chess.js';
import { FEN } from '../model/fen';
import { playService, configService } from './index.service';

/**
 * Start and pause of game, starts the bots if in turn
 * this does not need to be persisted
 */

export class DashboardService {
  showHist = false;
  showUndo = false;
  markLog = -1;
  undopos = 0;
  showEdit = false;
  editSquare = '';
  editFen = '';

  constructor() {
    makeAutoObservable(this);
  }

  // ****************************
  // Actions
  // ****************************
  startUndoTimer: (pos: number) => void = pos => {
    runInAction(() => {
      this.showUndo = true;
      this.undopos = pos;
    });
    window.setTimeout(() => {
      if (this.showUndo) {
        this.undopos = 0; // In the case you're already in a UNDO confirmation box.
      }
      this.showUndo = false;
    }, 9000);
  };

  setMarkLog(n: number) {
    runInAction(() => {
      this.markLog = n;
    });
  }

  toggleHistory() {
    runInAction(() => {
      this.showHist = !this.showHist;
    });
  }

  editStart() {
    runInAction(() => {
      this.showEdit = true;
      this.editFen = playService.fen;
      configService.showConfig = false;
    });
  }

  editDone(wcck: boolean, wccq: boolean, bcck: boolean, bccq: boolean, bf: boolean) {
    const fenArr = this.editFen.split(' ');
    fenArr[1] = bf ? BLACK : WHITE;
    fenArr[2] = (wcck ? 'K' : '') + (wccq ? 'Q' : '') + (bcck ? 'k' : '') + (bccq ? 'q' : '');
    const fen = fenArr.join(' ');
    runInAction(() => {
      this.editFen = fen;
      this.showEdit = false;
      playService.fen = fen;
      configService.showConfig = true;
    });
  }

  editMove(from: Square, to: Square) {
    const fenArr = this.editFen.split(' ');
    const brd = FEN.fen2brd(this.editFen).split('');
    const p1 = SQUARES.indexOf(from);
    const p2 = SQUARES.indexOf(to);
    const swap = brd[p1];
    brd[p1] = brd[p2];
    brd[p2] = swap;
    fenArr[0] = FEN.brd2fen(brd.join(''));
    const fen = fenArr.join(' ');
    runInAction(() => {
      this.editFen = fen;
    });
  }

  editPiece(piece: string) {
    const fenArr = this.editFen.split(' ');
    const brd = FEN.fen2brd(this.editFen).split('');
    const p = SQUARES.indexOf(this.editSquare as Square);
    brd[p] = piece;
    fenArr[0] = FEN.brd2fen(brd.join(''));
    const fen = fenArr.join(' ');
    runInAction(() => {
      this.editFen = fen;
    });
  }
}
