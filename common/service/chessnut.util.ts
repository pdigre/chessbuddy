import { FEN } from '../model/fen';

const START_FEN_BOARD_ONLY = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

type NibbleToPiece = (n: number) => string; // returns single-char piece or ' ' for empty

type NibbleOrder = 'hi-lo' | 'lo-hi';

type Orientation = {
  name: string;
  // source nibble index -> a8-board index
  mapIndex: (srcIndex: number) => number;
};

function makeOrientation(
  name: string,
  opts: { a1First: boolean; flipFiles: boolean; fileOffset?: number }
): Orientation {
  // srcIndex is interpreted as a8-first or a1-first depending on a1First.
  // Then optionally flip files (a<->h).
  // Then apply a cyclic file offset (some boards report files rotated).
  // Finally, return the resulting index in a8-first board order.
  const fileOffset = (((opts.fileOffset ?? 0) % 8) + 8) % 8;
  return {
    name,
    mapIndex: (srcIndex: number) => {
      const file0 = srcIndex % 8;
      const rank0 = Math.floor(srcIndex / 8);

      let file = file0;
      let rankFromTop: number;

      if (opts.a1First) {
        rankFromTop = 7 - rank0;
      } else {
        rankFromTop = rank0;
      }

      if (opts.flipFiles) {
        file = 7 - file;
      }

      file = (file + fileOffset) % 8;

      return rankFromTop * 8 + file;
    },
  };
}

function decodeNibbles32To64WithOrder(payload32: Uint8Array, order: NibbleOrder): number[] {
  // 32 bytes -> 64 nibbles
  const out: number[] = new Array(64);
  let j = 0;
  for (let i = 0; i < payload32.length; i++) {
    const b = payload32[i];
    const hi = (b >> 4) & 0x0f;
    const lo = b & 0x0f;
    if (order === 'hi-lo') {
      out[j++] = hi;
      out[j++] = lo;
    } else {
      out[j++] = lo;
      out[j++] = hi;
    }
  }
  return out;
}

function makeMappingStandard(): NibbleToPiece {
  // Common 4-bit scheme used by many boards:
  // 0 empty, 1..6 white pawn..king, 9..14 black pawn..king
  const table: Record<number, string> = {
    0x0: ' ',
    0x1: 'P',
    0x2: 'N',
    0x3: 'B',
    0x4: 'R',
    0x5: 'Q',
    0x6: 'K',
    0x9: 'p',
    0xa: 'n',
    0xb: 'b',
    0xc: 'r',
    0xd: 'q',
    0xe: 'k',
  };
  return (n: number) => table[n] ?? '?';
}

function makeMappingAlt1(): NibbleToPiece {
  // Another common scheme: 0 empty, 1..6 black pawn..king, 9..14 white pawn..king
  const table: Record<number, string> = {
    0x0: ' ',
    0x1: 'p',
    0x2: 'n',
    0x3: 'b',
    0x4: 'r',
    0x5: 'q',
    0x6: 'k',
    0x9: 'P',
    0xa: 'N',
    0xb: 'B',
    0xc: 'R',
    0xd: 'Q',
    0xe: 'K',
  };
  return (n: number) => table[n] ?? '?';
}

// Add back explicit Chessnut mappings for fallback mode.
function makeMappingChessnutObserved(): NibbleToPiece {
  // Empirically derived from observed start-position nibble stream:
  // rank8:  5 8 2 3 3 1 8 5
  // rank7:  4 x8
  // rank2:  7 x8
  // rank1:  a 6 c 9 9 b 6 a
  // The exact mapping of (3 vs 1) and (9 vs b) depends on king/queen, so we provide two variants.
  const table: Record<number, string> = {
    0x0: ' ',
    0x4: 'p',
    0x7: 'P',

    // assume 1=king, 3=queen, 9=queen, b=king (one of these will be wrong)
    0x5: 'r',
    0x8: 'n',
    0x2: 'b',
    0x3: 'q',
    0x1: 'k',

    0xa: 'R',
    0x6: 'N',
    0xc: 'B',
    0x9: 'Q',
    0xb: 'K',
  };
  return (n: number) => table[n] ?? '?';
}

function makeMappingChessnutObservedAlt(): NibbleToPiece {
  // Swap kings/queens compared to makeMappingChessnutObserved
  const table: Record<number, string> = {
    0x0: ' ',
    0x4: 'p',
    0x7: 'P',

    0x5: 'r',
    0x8: 'n',
    0x2: 'b',
    0x3: 'k',
    0x1: 'q',

    0xa: 'R',
    0x6: 'N',
    0xc: 'B',
    0x9: 'K',
    0xb: 'Q',
  };
  return (n: number) => table[n] ?? '?';
}

function squaresToBoardString(nibblesA8: number[], map: NibbleToPiece): string {
  let brd = '';
  for (let i = 0; i < 64; i++) {
    brd += map(nibblesA8[i]);
  }
  return brd;
}

function applyOrientation(src: number[], o: Orientation): number[] {
  const out = new Array<number>(64);
  for (let i = 0; i < 64; i++) {
    out[o.mapIndex(i)] = src[i];
  }
  return out;
}

function isValidPieceChar(c: string) {
  return c === ' ' || 'PNBRQKpnbrqk'.includes(c);
}

function countPieces(brd: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const c of brd) {
    if (c === ' ') continue;
    counts[c] = (counts[c] ?? 0) + 1;
  }
  return counts;
}

function pieceSetScore(counts: Record<string, number>): number {
  // Reward being close to a normal chess starting material.
  // This is intentionally tolerant (sensor glitches / promotions not handled here).
  const expected: Record<string, number> = {
    P: 8,
    N: 2,
    B: 2,
    R: 2,
    Q: 1,
    K: 1,
    p: 8,
    n: 2,
    b: 2,
    r: 2,
    q: 1,
    k: 1,
  };

  let score = 0;
  for (const [pc, exp] of Object.entries(expected)) {
    const got = counts[pc] ?? 0;
    // Penalize absolute deviation.
    score -= Math.abs(got - exp) * 50;
  }

  // Hard penalty if a king is missing (still allow if mapping unsure and uses '?').
  if ((counts['K'] ?? 0) !== 1) score -= 500;
  if ((counts['k'] ?? 0) !== 1) score -= 500;

  return score;
}

function scoreBoard(brd: string): number {
  // Higher is better.
  // If we can match the known starting position exactly, take it.
  const boardOnly = FEN.brd2fen(brd);
  if (boardOnly === START_FEN_BOARD_ONLY) return 1_000_000;

  if (brd.length !== 64) return -1e9;
  for (const c of brd) if (!isValidPieceChar(c) && c !== '?') return -1e9;

  // Prefer fewer unknowns
  let unknown = 0;
  for (const c of brd) if (c === '?') unknown++;

  // Prefer boards with mostly known pieces
  let score = 10_000 - unknown;

  // Extra: prefer plausible chess material counts.
  score += pieceSetScore(countPieces(brd));

  // NEW: strong bias toward being close to the standard start board (most frames are).
  // This prevents accidentally selecting a different but still 'plausible' mapping.
  const startB = FEN.fen2brd(FEN.NEW_GAME);
  let same = 0;
  for (let i = 0; i < 64; i++) {
    if (brd.charAt(i) === startB.charAt(i)) same++;
  }
  score += same * 30;

  return score;
}

type CachedDecoder = {
  order: NibbleOrder;
  orientation: Orientation;
  map: NibbleToPiece;
  mappingLabel: string;
};

let cachedDecoder: CachedDecoder | null = null;

export function resetChessnutDecoderCache() {
  cachedDecoder = null;
}

export function tryDecodeFenFromChessnutFrame(frame38: Uint8Array) {
  const payload32 = frame38.slice(2, 34);

  // Chessnut Air observations so far:
  // - Nibble order is stable as (hi, lo) for each byte.
  // - Board indexing is a8-first, no file mirroring, no file rotation.
  // If we allow generic file flips/offsets, we can easily pick an equally plausible
  // but wrong candidate (e.g. D-file becomes E-file).
  const nibbleOrders: NibbleOrder[] = ['hi-lo'];
  const orientations: Orientation[] = [
    makeOrientation('chessnut-a8-first', { a1First: false, flipFiles: false, fileOffset: 0 }),
  ];

  // Fast path: if we already locked onto a decoder, use it.
  if (cachedDecoder) {
    const nibblesSrc = decodeNibbles32To64WithOrder(payload32, cachedDecoder.order);
    const nA8 = applyOrientation(nibblesSrc, cachedDecoder.orientation);
    const brd = squaresToBoardString(nA8, cachedDecoder.map);

    const boardOnly = FEN.brd2fen(brd);
    return {
      fen: boardOnly + ' w KQkq - 0 1',
      boardOnly,
      mapping: cachedDecoder.mappingLabel,
      orientation: cachedDecoder.orientation.name,
      score: 999_999,
    };
  }

  // Evaluate candidates in a controlled, Chessnut-specific way.
  let bestOverall: {
    score: number;
    boardOnly: string;
    fen: string;
    order: NibbleOrder;
    orientation: Orientation;
    map: NibbleToPiece;
    mappingLabel: string;
  } | null = null;

  for (const order of nibbleOrders) {
    const nibblesSrc = decodeNibbles32To64WithOrder(payload32, order);
    for (const o of orientations) {
      const nA8 = applyOrientation(nibblesSrc, o);

      // Try exact-map first (only succeeds if the frame is exactly start position)
      const exact = deriveStartPositionMappingFromNibbles(nA8);
      if (exact) {
        const brd = squaresToBoardString(nA8, exact);
        const boardOnly = FEN.brd2fen(brd);
        const score = scoreBoard(brd);
        bestOverall = {
          score,
          boardOnly,
          fen: boardOnly + ' w KQkq - 0 1',
          order,
          orientation: o,
          map: exact,
          mappingLabel: 'derived-from-start-position',
        };
        if (boardOnly === START_FEN_BOARD_ONLY) {
          cachedDecoder = {
            order,
            orientation: o,
            map: exact,
            mappingLabel: 'derived-from-start-position(locked), nibbleOrder=' + order,
          };
          return {
            fen: boardOnly + ' w KQkq - 0 1',
            boardOnly,
            mapping: cachedDecoder.mappingLabel,
            orientation: o.name,
            score: 1_000_000,
          };
        }
      }

      // Near-start mapping: allow a small number of conflicts because the first frame
      // can already include a move.
      for (const maxConflicts of [0, 1, 2, 3, 4, 6, 8]) {
        const near = deriveNearStartPositionMappingFromNibbles(nA8, maxConflicts);
        if (!near) continue;

        const brd = squaresToBoardString(nA8, near);
        const score = scoreBoard(brd);
        if (score < 0) continue;

        const boardOnly = FEN.brd2fen(brd);
        if (!bestOverall || score > bestOverall.score) {
          bestOverall = {
            score,
            boardOnly,
            fen: boardOnly + ' w KQkq - 0 1',
            order,
            orientation: o,
            map: near,
            mappingLabel: 'derived-from-near-start-position',
          };
        }
      }
    }
  }

  if (bestOverall) {
    cachedDecoder = {
      order: bestOverall.order,
      orientation: bestOverall.orientation,
      map: bestOverall.map,
      mappingLabel: bestOverall.mappingLabel + '(locked), nibbleOrder=' + bestOverall.order,
    };

    return {
      fen: bestOverall.fen,
      boardOnly: bestOverall.boardOnly,
      mapping: cachedDecoder.mappingLabel,
      orientation: bestOverall.orientation.name,
      score: bestOverall.score,
    };
  }

  // Ultimate fallback: generic (kept for robustness)
  const mappings: Array<{ name: string; map: NibbleToPiece }> = [
    { name: 'standard(0=empty,1..6=W,9..14=B)', map: makeMappingStandard() },
    { name: 'alt1(0=empty,1..6=B,9..14=W)', map: makeMappingAlt1() },
    { name: 'chessnut-observed(via nibble patterns)', map: makeMappingChessnutObserved() },
    { name: 'chessnut-observed-alt', map: makeMappingChessnutObservedAlt() },
  ];

  let best: {
    score: number;
    fen: string;
    boardOnly: string;
    mapping: string;
    orientation: string;
    nibbleOrder: NibbleOrder;
  } | null = null;

  for (const m of mappings) {
    const nibblesSrc = decodeNibbles32To64WithOrder(payload32, 'hi-lo');
    const nA8 = nibblesSrc;
    const brd = squaresToBoardString(nA8, m.map);
    const score = scoreBoard(brd);
    if (score < 0) continue;

    const boardOnly = FEN.brd2fen(brd);
    const fen = boardOnly + ' w KQkq - 0 1';

    if (!best || score > best.score) {
      best = {
        score,
        fen,
        boardOnly,
        mapping: m.name,
        orientation: 'chessnut-a8-first',
        nibbleOrder: 'hi-lo',
      };
    }
  }

  return best;
}

function deriveStartPositionMappingFromNibbles(nA8: number[]): NibbleToPiece | null {
  const startB = FEN.fen2brd(FEN.NEW_GAME);

  const map = new Map<number, string>();
  for (let i = 0; i < 64; i++) {
    const nib = nA8[i];
    const pc = startB.charAt(i);

    const existing = map.get(nib);
    if (existing !== undefined && existing !== pc) return null;
    map.set(nib, pc);
  }

  const emptyCodes = [...map.entries()].filter(([, v]) => v === ' ').map(([k]) => k);
  if (emptyCodes.length !== 1) return null;

  const needed = new Set(['r', 'n', 'b', 'q', 'k', 'p', 'P', 'R', 'N', 'B', 'Q', 'K']);
  for (const v of map.values()) {
    if (v !== ' ') needed.delete(v);
  }
  if (needed.size > 0) return null;

  const table: Record<number, string> = {};
  for (const [k, v] of map.entries()) table[k] = v;
  return (n: number) => table[n] ?? '?';
}

function deriveNearStartPositionMappingFromNibbles(
  nA8: number[],
  maxConflicts: number
): NibbleToPiece | null {
  // Chessnut-specific near-start mapping.
  // Assumes the board is at (or very close to) the standard start position.
  // Handles early moves where one piece has moved (e.g. d2-d4, Nb1-c3).

  const rank = (r: number) => nA8.slice(r * 8, r * 8 + 8); // r=0 is rank8
  const countByNibble = (arr: number[]) => {
    const m = new Map<number, number>();
    for (const n of arr) m.set(n, (m.get(n) ?? 0) + 1);
    return m;
  };

  const pickMajorityNibble = (counts: Map<number, number>) => {
    let bestKey: number | null = null;
    let best = -1;
    for (const [k, c] of counts.entries()) {
      if (c > best) {
        best = c;
        bestKey = k;
      }
    }
    return bestKey;
  };

  const pickPawnNibbleFromStartRank = (r: number) => {
    // On start: 8 pawns on this rank. After a move: usually 7 pawns + 1 empty.
    // So take the nibble with count>=7 as pawn nibble.
    const counts = countByNibble(rank(r));
    let pawnNib: number | null = null;
    for (const [nib, c] of counts.entries()) {
      if (c >= 7) pawnNib = nib;
    }
    if (pawnNib == null) pawnNib = pickMajorityNibble(counts);
    if (pawnNib == null) return null;

    // The other nibble on that rank (if any) is very likely empty.
    let maybeEmptyNib: number | null = null;
    for (const [nib] of counts.entries()) {
      if (nib !== pawnNib) maybeEmptyNib = nib;
    }

    return { pawnNib, maybeEmptyNib };
  };

  // Identify pawn codes (robust to 1 pawn moved off the rank)
  const whitePawnRank = pickPawnNibbleFromStartRank(6);
  const blackPawnRank = pickPawnNibbleFromStartRank(1);
  if (!whitePawnRank || !blackPawnRank) return null;

  const whitePawnNib = whitePawnRank.pawnNib;
  const blackPawnNib = blackPawnRank.pawnNib;

  // Determine empty code.
  // Prefer: the 'odd' nibble on rank2/rank7 (if a pawn moved, that square became empty).
  // Otherwise: use majority nibble from middle ranks (3-6).
  const middle: number[] = [...rank(2), ...rank(3), ...rank(4), ...rank(5)];
  const emptyNibFromMiddle = pickMajorityNibble(countByNibble(middle));
  const emptyNib =
    whitePawnRank.maybeEmptyNib ?? blackPawnRank.maybeEmptyNib ?? emptyNibFromMiddle ?? null;
  if (emptyNib == null) return null;

  const table: Record<number, string> = {
    [emptyNib]: ' ',
    [whitePawnNib]: 'P',
    [blackPawnNib]: 'p',
  };

  // Map back ranks using fixed start patterns.
  const backRankPieces = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
  const backRankWhitePieces = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];

  const r8 = rank(0);
  const r1 = rank(7);

  let conflicts = 0;
  const assign = (nib: number, pc: string) => {
    const existing = table[nib];
    if (existing !== undefined && existing !== pc) {
      conflicts++;
      return;
    }
    table[nib] = pc;
  };

  for (let f = 0; f < 8; f++) {
    assign(r8[f], backRankPieces[f]);
    assign(r1[f], backRankWhitePieces[f]);
  }

  // Finally, try to infer a moved piece on middle ranks if we still haven't assigned
  // that nibble and it doesn't look like pawn/empty.
  // Example: d2-d4 puts a pawn nibble onto rank4.
  // Example: Nb1-c3 puts the knight nibble onto rank3.
  for (const nib of middle) {
    if (table[nib] !== undefined) continue;

    const midCounts = countByNibble(middle);
    const c = midCounts.get(nib) ?? 0;
    if (c !== 1) {
      continue;
    }

    // Intentionally left as unknown for now.
  }

  if (conflicts > maxConflicts) return null;

  // Exactly one empty code.
  const emptyCodes = Object.entries(table)
    .filter(([, v]) => v === ' ')
    .map(([k]) => Number(k));
  if (emptyCodes.length !== 1) return null;

  return (n: number) => table[n] ?? '?';
}
