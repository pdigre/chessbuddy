export class FEN {
  static NEW_GAME = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  static CLEAR_GAME = '8/8/8/8/8/8/8/8 w KQkq - 0 1';

  constructor(
    public board: string,
    public isWhiteTurn: boolean,
    public canCastleWK: boolean,
    public canCastleWQ: boolean,
    public canCastleBK: boolean,
    public canCastleBQ: boolean,
    public enPassant: string,
    public moves: number,
    public halfMoves: number
  ) {}

  public tostring(): string {
    return `${FEN.brd2fen(this.board)} ${this.isWhiteTurn ? 'w' : 'b'} ${
      this.canCastleWK ? 'K' : ''
    } ${this.canCastleWQ ? 'Q' : ''} ${this.canCastleBK ? 'k' : ''} ${
      this.canCastleBQ ? 'q' : ''
    } ${this.enPassant ?? '_'} ${this.moves ?? '0'} ${this.halfMoves ?? '0'}`;
  }

  public static create(fen: string): FEN {
    const [brd, isWhiteTurn, castling, enpassant, full, half] = fen.split(' ');
    return new FEN(
      this.fen2brd(brd),
      isWhiteTurn === 'w',
      castling.includes('K'),
      castling.includes('Q'),
      castling.includes('k'),
      castling.includes('q'),
      enpassant,
      Number.parseInt(full),
      Number.parseInt(half)
    );
  }

  static fen2brd = (fen: string) => {
    const n = (fen + ' ').indexOf(' ');
    let brd = '';
    for (let i = 0; i < n; i++) {
      const c = fen.charAt(i);
      if (c == '/') continue;
      brd += c > '0' && c < '9' ? '        '.substring(0, Number.parseInt(c)) : c;
    }
    return brd;
  };

  static brd2fen = (brd: string) => {
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
      if (c1 != c2) { // Piece different
        // Promotion white - check incomplete
        let src = brd1.charAt(from);
        if (c1 != c2 && src == 'P' && i < 8 && (c2=='Q' || c2=='R' || c2=='B' || c2=='N')) {
          to = i;
        } else
          // Promotion black - check incomplete
        if (c1 != c2 && src == 'p' && i > 55 && (c2=='q' || c2=='r' || c2=='b' || c2=='n')) {
          to = i;
        } else
          // Castling white - check for rook finished move
        if (c2 == "K" && from == 60 && ((i == 58 && brd2.charAt(59) == "R") || (i == 62 && brd2.charAt(61) == "R"))) {
          to = i;
        } else
          // Castling black - check for rook finished move
        if (c2 == "k" && from == 4 && ((i == 6 && brd2.charAt(5) == "r") || (i == 2 && brd2.charAt(3) == "r"))) {
          to = i;
        } else
          // Simple move to
        if (c1 != c2 && c2 == src) {
          to = i;
        }
      }
    }
    return to == -1 ? null : [from, to];
  }
}
