import Chess from 'chess.js';
import type { Square, Move, ShortMove } from 'chess.js';

export type Fen = string;
export type GameWinner = 'b' | 'w' | null;
export type { Square, Move, ShortMove };

export const NEW_GAME = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

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
  const froms: string[] = [];
  moves.forEach(san => {
    const move = Chess(fen).move(san);
    if (move && !froms.includes(move.from)) froms.push(move.from);
  });
  return froms;
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
