import Chess from 'chess.js';
import type { Square, Move, ShortMove } from 'chess.js';

export type Fen = string;
export type GameWinner = 'b' | 'w' | null;
export type { Square, Move, ShortMove };
export const SQUARES = Chess().SQUARES;
export const SQUARES2 = SQUARES.map(x => x.toString());

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

export const isMoveable = (fen: Fen, from: Square): boolean =>
  new Chess(fen).moves({ square: from }).length > 0;

export const move = (fen: Fen, from: Square, to: Square): [Fen, Move] | null => {
  const game = Chess(fen);
  const action = game.move({ from, to, promotion: 'q' });
  return action ? [game.fen(), action] : null;
};

export const replay = (moves: string[], to: number): Fen => {
  const game = Chess(NEW_GAME);
  for (let i = 0; i <= to; i++) {
    game.move(moves[i]);
  }
  return game.fen();
};

export const findInfoMarkers = (moves: string[], fen: string): string[] => {
  const sqs: string[] = [];
  moves.forEach(san => {
    const move = Chess(fen).move(san);
    if (move && !sqs.includes(move.from)) sqs.push(move.from);
    if (move && !sqs.includes(move.to)) sqs.push(move.to);
  });
  return sqs;
};

export const whoWon = (game: string[]) => {
  const n = game.length;
  const san = game[n - 1];
  if (san == '1-0') return 'White';
  if (san == '0-1') return 'Black';
  if (san == '1/2-1/2') return 'Draw';
  if (san?.endsWith('#')) return n % 2 == 0 ? 'w' : 'b';
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
    spaces = 0;
  }
  return fen;
};

export const leftFen = (fen: string) => {
  const brd = getBrd(fen);
  const brd2 = leftBrd(brd);
  return brd2fen(brd2) + fen.substring(fen.indexOf(' '));
};

export const leftwards = (i: number) => {
  const r = Math.floor(i / 8);
  const c = i % 8;
  return (7 - c) * 8 + r;
};

export const rightwards = (i: number) => {
  const r = Math.floor(i / 8);
  const c = i % 8;
  return c * 8 + (7 - r);
};

export const leftSquare: (c: Square) => Square = (c: Square) =>
  SQUARES[leftwards(SQUARES.indexOf(c))];

export const leftSquare2: (c: string) => Square = (c: string) =>
  SQUARES[leftwards(SQUARES2.indexOf(c))];

export const rightSquare2: (c: string) => Square = (c: string) =>
  SQUARES[rightwards(SQUARES2.indexOf(c))];

export const leftMove: (c: Move) => Move = (c: Move) => {
  c.from = leftSquare(c.from);
  c.to = leftSquare(c.to);
  return c;
};
