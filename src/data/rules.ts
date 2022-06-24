import type { Move, ShortMove, Square } from 'chess.js';
import { Chess } from 'chess.js';

export type Fen = string;
export type GameWinner = 'b' | 'w' | null;
export type { Square, Move, ShortMove };

export const SQUARES: Square[] = [
  'a8',
  'b8',
  'c8',
  'd8',
  'e8',
  'f8',
  'g8',
  'h8',
  'a7',
  'b7',
  'c7',
  'd7',
  'e7',
  'f7',
  'g7',
  'h7',
  'a6',
  'b6',
  'c6',
  'd6',
  'e6',
  'f6',
  'g6',
  'h6',
  'a5',
  'b5',
  'c5',
  'd5',
  'e5',
  'f5',
  'g5',
  'h5',
  'a4',
  'b4',
  'c4',
  'd4',
  'e4',
  'f4',
  'g4',
  'h4',
  'a3',
  'b3',
  'c3',
  'd3',
  'e3',
  'f3',
  'g3',
  'h3',
  'a2',
  'b2',
  'c2',
  'd2',
  'e2',
  'f2',
  'g2',
  'h2',
  'a1',
  'b1',
  'c1',
  'd1',
  'e1',
  'f1',
  'g1',
  'h1',
];

const chess = new Chess();

export const NEW_GAME = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
export const CLEAR_GAME = '8/8/8/8/8/8/8/8 w KQkq - 0 1';

export const isNewGame = (fen: Fen): boolean => fen == NEW_GAME;
export const isBlackTurn = (fen: Fen): boolean => Chess(fen).turn() === 'b';
export const isWhiteTurn = (fen: Fen): boolean => Chess(fen).turn() === 'w';
export const isCheck = (fen: Fen): boolean => Chess(fen).in_check();

export const getGameWinner = (fen: Fen): GameWinner => {
  const game = Chess(fen);
  return game.in_checkmate() ? (game.turn() === 'w' ? 'b' : 'w') : null;
};

export const isGameOver = (fen: Fen): boolean => Chess(fen).game_over();
export const isEndMove: (san: string) => boolean = (san: string) =>
  san == '1-0' || san == '0-1' || san == '1/2-1/2' || san?.endsWith('#');

export const isMoveable = (fen: Fen, from: Square): boolean =>
  Chess(fen).moves({ square: from }).length > 0;

export const move = (
  fen: Fen,
  from: Square,
  to: Square,
  promotion?: 'b' | 'n' | 'r' | 'q'
): [Fen, Move] | null => {
  const game = Chess(fen);
  const action = game.move({ from, to, promotion: promotion ?? 'q' });
  return action ? [game.fen(), action] : null;
};

export const newFen: (fen: string, san: string) => string = (fen, san) => {
  const game = Chess(fen);
  game.move(san);
  return game.fen();
};

export const replay = (moves: string[], to?: number): Fen => {
  const game = Chess(NEW_GAME);
  const n = to != undefined ? to : moves.length;
  for (let i = 0; i <= n; i++) {
    game.move(moves[i]);
  }
  return game.fen();
};

export const findInfoMarkers = (moves: string[], fen: string): Square[] => {
  const sqs: Square[] = [];
  moves.forEach(san => {
    const move = Chess(fen).move(san);
    if (move && !sqs.includes(move.from)) sqs.push(move.from);
    if (move && !sqs.includes(move.to)) sqs.push(move.to);
  });
  return sqs;
};

export const whoWon: (game: string[]) => string | undefined = (game: string[]) => {
  const n = game.length;
  const san = game[n - 1];
  if (san == '1-0') return 'White';
  if (san == '0-1') return 'Black';
  if (san == '1/2-1/2') return 'Draw';
  if (san?.endsWith('#')) return n % 2 == 0 ? 'Black' : 'White';
  return undefined;
};

const getBrd = (fen: string) => {
  const n = fen.indexOf(' ');
  let brd = '';
  for (let i = 0; i < n; i++) {
    const c = fen.charAt(i);
    if (c == '/') continue;
    brd += c > '0' && c < '9' ? '        '.substring(0, Number.parseInt(c)) : c;
  }
  return brd;
};

const leftBrd = (brd: string) => {
  let turn = '';
  for (let i = 0; i < 64; i++) turn += brd.charAt(leftwards(i));
  return turn;
};

const brd2fen = (brd: string) => {
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

export const leftFen: (fen: string) => string = fen => {
  const brd = getBrd(fen);
  const brd2 = leftBrd(brd);
  return brd2fen(brd2) + fen.substring(fen.indexOf(' '));
};

export const leftwards: (i: number) => number = i => {
  const r = Math.floor(i / 8);
  const c = i % 8;
  return (7 - c) * 8 + r;
};

export const rightwards: (i: number) => number = i => {
  const r = Math.floor(i / 8);
  const c = i % 8;
  return c * 8 + (7 - r);
};

export const leftSquare: (c: Square) => Square = (c: Square) =>
  SQUARES[leftwards(SQUARES.indexOf(c))];

export const rightSquare: (c: Square) => Square = (c: Square) =>
  SQUARES[rightwards(SQUARES.indexOf(c))];
