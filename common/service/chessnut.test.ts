import { describe, expect, test } from '@jest/globals';
import { FEN } from '../model/fen.ts';

function hexToBytes(hex: string): Uint8Array {
  const parts = hex
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean);

  const out = new Uint8Array(parts.length);
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i].toLowerCase().startsWith('0x') ? parts[i].slice(2) : parts[i];
    const v = Number.parseInt(p, 16);
    if (Number.isNaN(v) || v < 0 || v > 255) {
      throw new Error('hexToBytes: invalid byte "' + parts[i] + '" at index ' + i);
    }
    out[i] = v;
  }
  return out;
}

describe('Chessnut decode (pure)', () => {
  test('hexToBytes parses basic spaced hex', () => {
    expect(Array.from(hexToBytes('01 24 ff'))).toEqual([0x01, 0x24, 0xff]);
  });

  test('Start pos', async () => {
    const mod = await import('./chessnut.util.ts');
    const tryDecodeFenFromChessnutFrame = mod.tryDecodeFenFromChessnutFrame as (
      b: Uint8Array
    ) => any;
    const resetChessnutDecoderCache = mod.resetChessnutDecoderCache as () => void;

    resetChessnutDecoderCache();

    const data =
      '01 24 58 23 31 85 44 44 44 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 77 77 77 77 a6 c9 9b 6a 16 00 00 00';
    const decoded = tryDecodeFenFromChessnutFrame(hexToBytes(data));
    expect(decoded).not.toBeNull();
    expect(decoded.boardOnly).toBe(FEN.NEW_GAME);
  });

  test('Start pos + d4', async () => {
    const mod = await import('./chessnut.util.ts');
    const tryDecodeFenFromChessnutFrame = mod.tryDecodeFenFromChessnutFrame as (
      b: Uint8Array
    ) => any;
    const resetChessnutDecoderCache = mod.resetChessnutDecoderCache as () => void;

    resetChessnutDecoderCache();

    const data =
      '01 24 58 23 31 85 44 44 40 44 00 00 00 00 00 00 00 00 00 00 07 00 00 00 00 00 77 77 70 77 a6 c9 9b 6a c5 08 00 00';
    const decoded = tryDecodeFenFromChessnutFrame(hexToBytes(data));
    expect(decoded).not.toBeNull();
    expect(decoded.boardOnly).toBe('rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR');
  });

  test('Start pos + Knight c3', async () => {
    const mod = await import('./chessnut.util.ts');
    const tryDecodeFenFromChessnutFrame = mod.tryDecodeFenFromChessnutFrame as (
      b: Uint8Array
    ) => any;
    const resetChessnutDecoderCache = mod.resetChessnutDecoderCache as () => void;

    resetChessnutDecoderCache();

    const data =
      '01 24 58 23 31 85 44 44 44 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 a0 00 77 77 77 77 a6 c9 9b 60 61 0d 00 00';
    const decoded = tryDecodeFenFromChessnutFrame(hexToBytes(data));
    expect(decoded).not.toBeNull();
    expect(decoded.boardOnly).toBe('rnbqkbnr/pppppppp/8/8/8/2N5/PPPPPPPP/R1BQKBNR');
  });
});
