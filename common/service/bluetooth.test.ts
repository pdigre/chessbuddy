import { describe, expect, test } from '@jest/globals';
import { RulesService } from './rules.service.ts';

describe('Move diff', () => {
  test('D2 D4', () => {
    // Simple position: black bishop on c8, target square g4 empty.
    const fen1 = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    const fen2 = 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR';
    const move = new RulesService().diffFen(fen1, fen2);
    expect(move).toBe('d2 d4');
  });

  test('E7 E5', () => {
    // Simple position: black bishop on c8, target square g4 empty.
    const fen1 = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR';
    const fen2 = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR';
    const move = new RulesService().diffFen(fen1, fen2);
    expect(move).toBe('e7 e5');
  });
});
