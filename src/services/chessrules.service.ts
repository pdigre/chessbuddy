import type { Move, ShortMove, Square } from 'chess.js';
import { Chess, SQUARES } from 'chess.js';

export type Fen = string;
export type { Square, Move, ShortMove };

export class ChessRulesService {
  NEW_GAME = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  CLEAR_GAME = '8/8/8/8/8/8/8/8 w KQkq - 0 1';

  isEndMove: (san: string) => boolean = (san: string) =>
    san == '1-0' || san == '0-1' || san == '1/2-1/2' || san?.endsWith('#');

  move = (
    fen: Fen,
    from: Square,
    to: Square,
    promotion?: 'b' | 'n' | 'r' | 'q'
  ): [Fen, Move] | null => {
    const game = Chess(fen);
    const action = game.move({ from, to, promotion: promotion ?? 'q' });
    return action ? [game.fen(), action] : null;
  };

  newFen: (fen: string, san: string) => string = (fen, san) => {
    const game = Chess(fen);
    game.move(san);
    return game.fen();
  };

  replay = (moves: string[], to?: number): Fen => {
    const game = Chess(this.NEW_GAME);
    const n = to != undefined ? to : moves.length;
    for (let i = 0; i <= n; i++) {
      game.move(moves[i]);
    }
    return game.fen();
  };

  whoWon: (game: string[]) => string | undefined = (game: string[]) => {
    const n = game.length;
    const san = game[n - 1];
    if (san == '1-0') return 'White';
    if (san == '0-1') return 'Black';
    if (san == '1/2-1/2') return 'Draw';
    if (san?.endsWith('#')) return n % 2 == 0 ? 'Black' : 'White';
    return undefined;
  };

  getBrd = (fen: string) => {
    const n = fen.indexOf(' ');
    let brd = '';
    for (let i = 0; i < n; i++) {
      const c = fen.charAt(i);
      if (c == '/') continue;
      brd += c > '0' && c < '9' ? '        '.substring(0, Number.parseInt(c)) : c;
    }
    return brd;
  };

  leftBrd = (brd: string) => {
    let turn = '';
    for (let i = 0; i < 64; i++) turn += brd.charAt(this.leftwards(i));
    return turn;
  };

  brd2fen = (brd: string) => {
    let fen = '';
    let spaces = 0;
    for (let i = 0; i < 64; i++) {
      const c = brd.charAt(i);
      if (i % 8 == 0 && i) {
        if (spaces) {
          fen += spaces;
          spaces = 0;
        }
        fen += '/';
      }
      if (c == ' ') {
        spaces++;
      } else {
        if (spaces) {
          fen += spaces;
          spaces = 0;
        }
        fen += c;
      }
    }
    if (spaces) {
      fen += spaces;
    }
    return fen;
  };

  leftFen: (fen: string) => string = fen => {
    const brd = this.getBrd(fen);
    const brd2 = this.leftBrd(brd);
    return this.brd2fen(brd2) + fen.substring(fen.indexOf(' '));
  };

  leftwards: (i: number) => number = i => {
    const r = Math.floor(i / 8);
    const c = i % 8;
    return (7 - c) * 8 + r;
  };

  rightwards: (i: number) => number = i => {
    const r = Math.floor(i / 8);
    const c = i % 8;
    return c * 8 + (7 - r);
  };

  leftSquare: (c: Square) => Square = (c: Square) => SQUARES[this.leftwards(SQUARES.indexOf(c))];

  rightSquare: (c: Square) => Square = (c: Square) => SQUARES[this.rightwards(SQUARES.indexOf(c))];
}
export const chessRulesService = new ChessRulesService();
