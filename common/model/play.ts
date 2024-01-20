import { Persist } from './model.ts';
import { FEN } from './fen.ts';

export class Play implements Persist {
  persist = () => ({
    name: 'play',
    init: new Play(),
  });

  constructor(
    public wtime = 0,
    public btime = 0,
    public log: string[] = [],
    public fen = FEN.NEW_GAME
  ) {}
}
