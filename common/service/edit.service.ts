import * as chess from 'chess.js';
import { action, makeObservable, observable } from 'mobx';
import { FEN } from '../model/fen';
import { configService } from './index.service';

export class EditService {
  showEdit = false;
  editSquare = '';
  editFen = '';

  wcck = false;
  wccq = false;
  bcck = false;
  bccq = false;
  bFirst = false;

  constructor() {
    makeObservable(this, {
      showEdit: observable,
      editSquare: observable,
      editFen: observable,
      wcck: observable,
      wccq: observable,
      bcck: observable,
      bccq: observable,
      bFirst: observable,
      editDoneAction: action,
      editPiece: action,
      editMove: action,
    });
  }

  editStart(fen: string) {
    this.showEdit = true;
    this.editFen = fen;
    configService.showConfig = false;
  }

  editDoneAction = action(() => {
    const fenArr = this.editFen.split(' ');
    fenArr[1] = this.bFirst ? chess.BLACK : chess.WHITE;
    fenArr[2] =
      (this.wcck ? 'K' : '') +
      (this.wccq ? 'Q' : '') +
      (this.bcck ? 'k' : '') +
      (this.bccq ? 'q' : '');
    const fen = fenArr.join(' ');
    this.editFen = fen;
    this.showEdit = false;
    //    playService.fen = fen;
    configService.showConfig = true;
  });

  editPiece = (piece: string) => {
    const fenArr = this.editFen.split(' ');
    const brd = FEN.fen2brd(this.editFen).split('');
    const p = chess.SQUARES.indexOf(this.editSquare as chess.Square);
    brd[p] = piece;
    fenArr[0] = FEN.brd2fen(brd.join(''));
    const fen = fenArr.join(' ');
    this.editFen = fen;
  };

  editMove(from: chess.Square, to: chess.Square) {
    const fenArr = this.editFen.split(' ');
    const brd = FEN.fen2brd(this.editFen).split('');
    const p1 = chess.SQUARES.indexOf(from);
    const p2 = chess.SQUARES.indexOf(to);
    const swap = brd[p1];
    brd[p1] = brd[p2];
    brd[p2] = swap;
    fenArr[0] = FEN.brd2fen(brd.join(''));
    const fen = fenArr.join(' ');
    this.editFen = fen;
  }

  onSquareClick(square: chess.Square) {
    if (this.showEdit) {
      this.editSquare = square;
    }
  }
}
