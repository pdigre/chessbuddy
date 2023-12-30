import { BLACK, Square, SQUARES, WHITE } from 'chess.js';
import { jsonIgnore } from 'json-ignore';
import { action, makeAutoObservable } from 'mobx';
import { FEN } from '../model/fen';
import { configService, playService } from './index.service';
import { GETSET, Item } from '../model/model.ts';

export class EditService implements Item {
  showEdit = false;
  editSquare = '';
  editFen = '';

  wcck = false;
  wccq = false;
  bcck = false;
  bccq = false;
  bFirst = false;

  @jsonIgnore() properties: Map<string, GETSET<boolean>> = new Map([
    ['wcck', [() => this.wcck, v => (this.wcck = v)]],
    ['wccq', [() => this.wccq, v => (this.wccq = v)]],
    ['bcck', [() => this.bcck, v => (this.bcck = v)]],
    ['bccq', [() => this.bccq, v => (this.bccq = v)]],
    ['bFirst', [() => this.bFirst, v => (this.bFirst = v)]],
  ]);
  getProp = (name: string) => this.properties.get(name)![0]();
  setProp = action((name: string, v: any) => this.properties.get(name)![1](v));

  constructor() {
    makeAutoObservable(this);
  }

  editStart(fen: string) {
    this.showEdit = true;
    this.editFen = fen;
    configService.showConfig = false;
  }

  editDoneAction = action(() => {
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
  });

  editPiece = (piece: string) => {
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
