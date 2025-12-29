import { describe, expect, test } from '@jest/globals';
import { FEN } from '../model/fen.ts';

describe('Chessnut decode (pure)', () => {

  test('Start pos Quarter', async () => {
    const mod = await import('./chessnut.util.ts');
    const data =
      '01 24 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 77 77 00 00 9b 6a 09 00 00 00';
    const fen = "8/8/8/8/8/8/PPPP4/RNBQ4";
    expect(mod.decodeHex(data)).toBe(FEN.fen2brd(fen));
  });

  test('Start pos', async () => {
    const mod = await import('./chessnut.util.ts');
    const data =
      '01 24 58 23 31 85 44 44 44 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 77 77 77 77 a6 c9 9b 6a 16 00 00 00';
    let fen = FEN.NEW_GAME;
    expect(mod.decodeHex(data)).toBe(FEN.fen2brd(fen));
  });

  test('Start pos + d4', async () => {
    const mod = await import('./chessnut.util.ts');
    const data =
      '01 24 58 23 31 85 44 44 44 44 00 00 00 00 00 00 00 00 00 00 07 00 00 00 00 00 77 77 70 77 a6 c9 9b 6a 1a 0d 00 00';
    let fen = 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR';
    expect(mod.decodeHex(data)).toBe(FEN.fen2brd(fen));
  });

  test('Start pos + Knight c3', async () => {
    const mod = await import('./chessnut.util.ts');
    const data =
      '01 24 58 23 31 85 44 44 44 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 a0 00 77 77 77 77 a6 c9 9b 60 61 0d 00 00';
    let fen = 'rnbqkbnr/pppppppp/8/8/8/2N5/PPPPPPPP/R1BQKBNR';
    expect(mod.decodeHex(data)).toBe(FEN.fen2brd(fen));
  });
});
