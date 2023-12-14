import { BLACK, Square, SQUARES, WHITE } from 'chess.js';
import { jsonIgnore } from 'json-ignore';
import { makeAutoObservable } from 'mobx';
import { FEN } from '../model/fen';
import { configService, playService } from './index.service';
import {GETSET} from "../model/model.ts";

export class EditService {
  showEdit = false;
  editSquare = '';
  editFen = '';

  wcck = false;
  wccq = false;
  bcck = false;
  bccq = false;
  bFirst = false;

  @jsonIgnore() boolprops: Map<string, GETSET<boolean>> = new Map([
    ['wcck', { get: () => this.wcck, set: value => (this.wcck = value) }],
    ['wccq', { get: () => this.wccq, set: value => (this.wccq = value) }],
    ['bcck', { get: () => this.bcck, set: value => (this.bcck = value) }],
    ['bccq', { get: () => this.bccq, set: value => (this.bccq = value) }],
    ['bFirst', { get: () => this.bFirst, set: value => (this.bFirst = value) }],
  ]);

  constructor() {
    makeAutoObservable(this);
  }

  editStart(fen: string) {
    this.showEdit = true;
    this.editFen = fen;
    configService.showConfig = false;
  }

  readonly editDoneAction = () => {
    const fenArr = this.editFen.split(' ');
    fenArr[1] = this.bFirst ? BLACK : WHITE;
    fenArr[2] =
      (this.wcck ? 'K' : '') +
      (this.wccq ? 'Q' : '') +
      (this.bcck ? 'k' : '') +
      (this.bccq ? 'q' : '');
    const fen = fenArr.join(' ');
    this.editFen = fen;
    this.showEdit = false;
    playService.fen = fen;
    configService.showConfig = true;
  };

  readonly editPiece = (piece: string) => {
    const fenArr = this.editFen.split(' ');
    const brd = FEN.fen2brd(this.editFen).split('');
    const p = SQUARES.indexOf(this.editSquare as Square);
    brd[p] = piece;
    fenArr[0] = FEN.brd2fen(brd.join(''));
    const fen = fenArr.join(' ');
    this.editFen = fen;
  };

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
    this.editFen = fen;
  }

  onSquareClick(square: Square) {
    if (this.showEdit) {
      this.editSquare = square;
    }
  }
}
