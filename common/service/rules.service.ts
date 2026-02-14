// @ts-ignore
import type { Move, Square, ShortMove } from 'chess.js';
import { Chess, SQUARES, QUEEN } from 'chess.js';
import { FEN } from '../model/fen';

export type Fen = string;
export type { Square, Move, ShortMove };

export class RulesService {
  isEndMove: (san: string) => boolean = (san: string) =>
    san == '1-0' || san == '0-1' || san == '1/2-1/2' || san?.endsWith('#');

  move = (
    fen: Fen,
    from: Square,
    to: Square,
    promotion?: 'b' | 'n' | 'r' | 'q'
  ): [Fen, Move] | null => {
    const game = new Chess(fen);
    try {
      const action = game.move({ from, to, promotion: promotion ?? QUEEN });
      return action ? [game.fen(), action] : null;
    } catch (e) {
      return null;
    }
  };

  newFen: (fen: string, san: string) => string = (fen, san) => {
    const game = new Chess(fen);
    game.move(san);
    return game.fen();
  };

  replay = (moves: string[], to?: number): Fen => {
    const game = new Chess(FEN.NEW_GAME);
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

  leftBrd = (brd: string) => {
    let turn = '';
    for (let i = 0; i < 64; i++) turn += brd.charAt(this.leftwards(i));
    return turn;
  };

  leftFen: (fen: string) => string = fen => {
    const brd = FEN.fen2brd(fen);
    const brd2 = this.leftBrd(brd);
    return FEN.brd2fen(brd2) + fen.substring(fen.indexOf(' '));
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

  getCastlingSquares = (fen: string) => {
    const sqs: Square[] = [];
    const cc = fen.split(' ')[2];
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

  splitRotation(rot: number) {
    return {
      r90: rot % 2 == 1,
      r180: rot > 1,
    };
  }

  board2Square(sq: Square, rotation: number) {
    const r90 = rotation % 2 == 1;
    return r90 ? this.leftSquare(sq) : sq;
  }

  /**
   * Detect if a move is legal and finished.
   * Castling and promotion are typical moves that require more than one piece to be moved
   * same thing with killing pieces.
   * We may need to distinguish sliding moves and allow a timer for completing them.
   */
  static detectMove(brd1: string, brd2: string) {
    let from = -1;
    for (let i = 0; i < 64; i++) {
      const c1 = brd1.charAt(i);
      const c2 = brd2.charAt(i);
      if (c2 == ' ' && c1 != ' ') {
        if (from == -1 || c1.toUpperCase() == 'K') {
          // Castling - keep king move
          from = i;
        }
      }
    }
    if (from == -1) {
      return null;
    }
    let to = -1;
    for (let i = 0; i < 64; i++) {
      const c1 = brd1.charAt(i);
      const c2 = brd2.charAt(i);
      if (c1 != c2) {
        // Piece different
        const src = brd1.charAt(from);
        // Check incomplete
        if (src == 'P' && i < 8) {
          // Promotion white
          if (c2 == 'Q' || c2 == 'R' || c2 == 'B' || c2 == 'N') {
            to = i;
          }
        } else if (src == 'p' && i > 55) {
          // Promotion black
          if (c2 == 'q' || c2 == 'r' || c2 == 'b' || c2 == 'n') {
            to = i;
          }
        } else if (
          c2 == 'K' &&
          from == 60 &&
          ((i == 58 && brd2.charAt(59) == 'R') || (i == 62 && brd2.charAt(61) == 'R'))
        ) {
          // Castling white
          to = i;
        } else if (
          c2 == 'k' &&
          from == 4 &&
          ((i == 6 && brd2.charAt(5) == 'r') || (i == 2 && brd2.charAt(3) == 'r'))
        ) {
          // Castling black
          to = i;
        } else if (c2 == src) {
          // Simple move to
          to = i;
        }
      }
    }
    return to == -1 ? null : [from, to];
  }
}
