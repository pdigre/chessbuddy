import { Storage } from './model.ts';
import { FEN } from './fen.ts';

export class Play implements Storage<Play>{

  // Config to store
  wtime = 0;
  btime = 0;
  log: string[] = [];
  fen = FEN.NEW_GAME;

  name = () => 'play';
  save = () => ({wtime: this.wtime, btime:this.btime, log:this.log, fen:this.fen} as Play);
  load = (obj:Play) => {
    Object.assign(this, obj ?? {
      wtime: 0,
      btime: 0,
      log: [],
      fen: FEN.NEW_GAME,
    });
  }

}
