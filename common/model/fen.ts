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
    const n = fen.indexOf(' ');
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
}
