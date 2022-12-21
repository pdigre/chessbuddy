import { ChessRulesService } from '../services/chessrules.service';
import { FEN } from './fen';

export class Games {
  constructor(public games: Game[]) {}
}

export class Game {
  constructor(
    public id: string,
    public date: Date,
    public white: string,
    public black: string,
    public wtime: number,
    public btime: number,
    public log: string[],
    public fen: string
  ) {}

  public static create(txt: string): Game | undefined {
    const split = Game.readGame(txt)?.split(';');
    return split
      ? new Game(
          split[0],
          new Date(Number.parseInt(split[0], 36)),
          split[1],
          split[2],
          Number.parseInt(split[3], 36),
          Number.parseInt(split[4], 36),
          split[5].split(' '),
          FEN.NEW_GAME
        )
      : undefined;
  }

  public static readGame: (x: string) => string | undefined = x => {
    const s = x.split(';');
    const date = Game.readDate(s[0]);
    if (!date) return undefined;
    if (s.length == 6) {
      return date + ';' + s[1] + ';' + s[2] + ';' + s[3] + ';' + s[4] + ';' + s[5];
    } else if (s.length == 4) {
      return date + ';' + s[1] + ';' + s[2] + ';0;0;' + s[3];
    } else {
      console.log('Unknown format ' + x);
    }
    return undefined;
  };

  private static readDate: (x: string) => string | undefined = x => {
    if (x == 'NaN') return undefined;
    const min = Date.parse('03/03/2021');
    const max = Date.now();
    let d = Date.parse(x);
    if (isNaN(d) || d < min || d > max) {
      d = Number.parseInt(x) * 1000;
    }
    if (isNaN(d) || d < min || d > max) {
      d = Number.parseInt(x, 36);
    }
    if (isNaN(d) || d < min || d > max) {
      console.log('Unknown date ' + x);
      return undefined;
    }
    return d.toString(36);
  };
  public static oldgames = [
    'knaig7sg;Ronny;Per;1ev;1ki;d4 c5 dxc5 Nf6 b4 a5 c3 axb4 cxb4 e6 e3 Nc6 Bd2 d5 Bb5 Be7 Ne2 O-O O-O Bd7 a4 b6 Bxc6 Bxc6 cxb6 Qxb6 a5 Qa6 Nd4 Bd7 Na3 e5 b5 Qb7 Ndc2 Bxb5 Rb1 Rfb8 Rxb5 Qc7 Qe2 Ne4 Be1 Rxb5 Nxb5 Qd7 f3 Nc5 Bb4 Rb8 Nc3 d4 exd4 exd4 Rd1 d3 Qe3 Qe6 Qxe6 fxe6 Nd4 Rxb4 Nc6 Rc4 a6 Nxa6 Nxe7+ Kf7 Ne4 Kxe7 Rxd3 Nb4 Rb3 Nd5 Rb7+ Rc7 Rxc7+ Nxc7 g3 Nd5 Kf2 e5 Ke2 h5 Kd3 Ke6 Ng5+ Kf5 h4 g6 Kd2 Nf6 Ke3 Nd5+ Ke2 Nc3+ Kd3 Nb5 Ne4 Nd4 Ke3 Nc2+ 1/2-1/2',
    'knaj2f83;Ronny;Per;1o3;1yr;d4 f5 e3 Nf6 f4 b6 Nf3 Bb7 c4 g6 g3 Bg7 Bg2 O-O O-O Be4 Nc3 d5 cxd5 Bxd5 Nxd5 Nxd5 Qb3 e6 Ng5 c6 Nxe6 Qd6 Nxf8 Qxf8 Bxd5+ 1-0',
    'knanqmb1;Per;Ronny;4sq;3ck;c4 e5 Nc3 f5 Nf3 d6 d4 e4 Ng5 h6 Nh3 g5 e3 Nf6 f3 exf3 gxf3 Bg7 Bd2 O-O Rg1 c5 d5 a6 f4 g4 Nf2 Re8 h3 h5 Qc2 Qe7 Bd3 h4 hxg4 fxg4 O-O-O g3 Nfe4 Bg4 Ng5 Bxd1 Qxd1 Qd7 Rh1 Qg4 Be2 Qf5 Rxh4 b5 e4 Rxe4 Ncxe4 Nxe4 Bg4 Nf2 Bxf5 Nxd1 Kxd1 Bxb2 Rg4 Ra7 Rxg3 b4 Ne4+ Rg7 Be6+ Kf8 Rxg7 Kxg7 f5 a5 Bg5 Be5 f6+ Kg6 f7 Kg7 Bh6+ Kxh6 f8=Q+ 1-0',
    'knaqui2r;Per;Ronny;7qp;4de;d4 d5 c4 e6 Nf3 dxc4 Nc3 a6 a4 Bb4 e3 c5 Bxc4 cxd4 exd4 Nc6 O-O Nf6 Qe2 Nxd4 Nxd4 Qxd4 Bg5 Qg4 Bxf6 Qxe2 Bxe2 gxf6 Rac1 Bd7 Bf3 Bc6 Bxc6+ bxc6 Rfd1 f5 h4 Rb8 g3 Ke7 b3 Ba3 Rb1 e5 Kf1 Rhc8 Rd3 Bb4 Rc1 Bc5 Ne2 Ba3 Rc2 Bd6 f4 e4 Rdc3 c5 Nd4 cxd4 Rxc8 Rxb3 Kf2 e3+ Ke1 d3 R2c3 Bb4 Rc7+ Kf6 Rc6+ Kg7 0-1',
    'knaychuz;Per;Ronny;8rp;553;d4 d5 Nf3 f5 Bf4 e6 a4 Bd6 Ne5 Nf6 e3 O-O c4 Bb4+ Nc3 Ne4 Qb3 Bxc3+ bxc3 dxc4 Bxc4 Qe7 f3 Nd6 O-O Nxc4 Qxc4 a5 Nd3 b6 Qxc7 Qxc7 Bxc7 Ba6 Rfd1 Rc8 Bxb6 Nd7 Bxa5 Bxd3 Bb4 Bc2 Rdc1 Rxa4 Rxa4 Bxa4 c4 Bb5 c5 Kf7 Ra1 Rc7 h3 e5 d5 Nxc5 Ra5 Nd3 Rxb5 Rc1+ Kh2 h5 Rb7+ Kg6 Bf8 f4 e4 Nf2 Rxg7+ Kf6 Re7 Rh1#',
    'knbja009;Per;Ronny;og;16k;c4 e5 g3 c6 Nf3 e4 Nd4 d5 cxd5 Qxd5 e3 c5 Nc3 Qe5 Nb3 b6 Bg2 Bb7 O-O f5 Nb5 Nc6 d4 cxd4 exd4 Qxb5 d5 Nb4 d6 Rd8 Bf4 Nd3 Qe2 Bxd6 Bg5 Be7 Be3 Bc5 Bg5 Be7 Be3 Bd5 Nd4 Qxb2 Qxb2 Nxb2 Nxf5 Bf6 Bd4 Bxd4 Nxd4 Bc4 Nc6 Bxf1 Kxf1 Rd1+ Rxd1 Nxd1 Nxa7 Nf6 Nb5 Kf7 Ke2 Rd8 0-1',
    'knbl3sat;Per;Ronny;1xc;28q;d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 c6 Qc2 Na6 a3 Qe8 b4 e5 b5 cxb5 cxb5 Nc7 Bg5 e4 Bxf6 Bxf6 Nd2 Nxb5 Nxb5 Qxb5 Qc4+ Qxc4 Nxc4 d5 Nd6 Bxd4 Rad1 Bc5 Rxd5 Bxa3 f3 Be6 Rd2 Rad8 Rfd1 Bxd6 Rxd6 Rxd6 Rxd6 Bc4 fxe4 Bxe2 exf5 Rxf5 Rd7 Rf7 Bd5 1-0',
    'kn62vy6k;Per;Ronny;16;2s;e4 e5 d4 exd4 Qxd4 Nc6 1-0',
    'kngha7xw;Per;Ronny;18;11;d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Bd2 1-0',
    'kn62vy60;Per;Ronny;2;2;c4 c5 Nc3 Nc6 Nf3 g6 d4 cxd4 Nxd4 Bg7 Nxc6 bxc6 e3 Qa5 Bd2 Qb6 Na4 Qb8 Rb1 d6 c5 d5 b4 Bf5 Rb3 Be6 Rb1 d4 a3 dxe3 Bxe3 Qe5 Be2 Rd8 Qc1 Bd5 O-O Qe4 Bf3 Qc4 Bxd5 Qxd5 Rd1 Qxd1+ Qxd1 Rxd1+ Rxd1 Bb2',
  ];
}
