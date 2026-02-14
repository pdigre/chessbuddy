import { beforeEach, describe, expect, test } from '@jest/globals';
import { RulesService } from './rules.service.ts';
import { FEN } from '../model/fen.ts';
import { SQUARES } from 'chess.js';

describe('Test RulesService', () => {
  let service: RulesService;

  beforeEach(() => {
    service = new RulesService();
  });

  test('isEndMove should return true for end game moves', () => {
    expect(service.isEndMove('1-0')).toBe(true);
    expect(service.isEndMove('0-1')).toBe(true);
    expect(service.isEndMove('1/2-1/2')).toBe(true);
    expect(service.isEndMove('Qa1#')).toBe(true);
  });

  test('isEndMove should return false for non-end game moves', () => {
    expect(service.isEndMove('e4')).toBe(false);
    expect(service.isEndMove('Nf3')).toBe(false);
  });
});

function move2string(move: number[] | null) {
  return move ? SQUARES[move[0]] + ' ' + SQUARES[move[1]] : null;
}

describe('Move diff', () => {
  test('D2 D4', () => {
    // Simple position: black bishop on c8, target square g4 empty.
    const fen1 = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    const fen2 = 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR';
    const move = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen2));
    expect(move2string(move)).toBe('d2 d4');
  });

  test('E7 E5', () => {
    // Simple position: black bishop on c8, target square g4 empty.
    const fen1 = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR';
    const fen2 = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR';
    const move = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen2));
    expect(move2string(move)).toBe('e7 e5');
  });

  test('Promo white to queeen', () => {
    // Simple position: black bishop on c8, target square g4 empty.
    const fen1 = '8/PK6/8/8/8/8/pk6/8';
    const fen2 = 'P7/1K6/8/8/8/8/pk6/8';
    const fen3 = 'Q7/1K6/8/8/8/8/pk6/8';
    const move1 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen2));
    expect(move1).toBe(null);
    const move2 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen3));
    expect(move2string(move2)).toBe('a7 a8');
  });

  test('Promo black to knight', () => {
    // Simple position: black bishop on c8, target square g4 empty.
    const fen1 = '8/PK6/8/8/8/8/pk6/8';
    const fen2 = '8/PK6/8/8/8/8/1k6/p7';
    const fen3 = '8/PK6/8/8/8/8/1k6/n7';
    const move1 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen2));
    expect(move1).toBe(null);
    const move2 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen3));
    expect(move2string(move2)).toBe('a2 a1');
  });

  test('Castling white queeen', () => {
    // Simple position: black bishop on c8, target square g4 empty.
    const fen1 = 'r3k2r/8/8/8/8/8/8/R3K2R';
    const fen2 = 'r3k2r/8/8/8/8/8/8/R1K4R';
    const fen3 = 'r3k2r/8/8/8/8/8/8/2KR3R';
    const move1 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen2));
    expect(move1).toBe(null);
    const move2 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen3));
    expect(move2string(move2)).toBe('e1 c1');
  });

  test('Castling white king', () => {
    // Simple position: black bishop on c8, target square g4 empty.
    const fen1 = 'r3k2r/8/8/8/8/8/8/R3K2R';
    const fen2 = 'r3k2r/8/8/8/8/8/8/R5KR';
    const fen3 = 'r3k2r/8/8/8/8/8/8/R4RK1';
    const move1 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen2));
    expect(move1).toBe(null);
    const move2 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen3));
    expect(move2string(move2)).toBe('e1 g1');
  });

  test('Castling black queeen', () => {
    // Simple position: black bishop on c8, target square g4 empty.
    const fen1 = 'r3k2r/8/8/8/8/8/8/R3K2R';
    const fen2 = 'r3k2r/8/8/8/8/8/8/R1K4R';
    const fen3 = '2kr3r/8/8/8/8/8/8/R3K2R';
    const move1 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen2));
    expect(move1).toBe(null);
    const move2 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen3));
    expect(move2string(move2)).toBe('e8 c8');
  });

  test('Castling black king', () => {
    // Simple position: black bishop on c8, target square g4 empty.
    const fen1 = 'r3k2r/8/8/8/8/8/8/R3K2R';
    const fen2 = 'r3k2r/8/8/8/8/8/8/R5KR';
    const fen3 = 'r4rk1/8/8/8/8/8/8/R3K2R';
    const move1 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen2));
    expect(move1).toBe(null);
    const move2 = RulesService.detectMove(FEN.fen2brd(fen1), FEN.fen2brd(fen3));
    expect(move2string(move2)).toBe('e8 g8');
  });
});
