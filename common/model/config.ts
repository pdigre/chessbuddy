import { Human } from './human.ts';
import { Bot } from './bot.ts';
import { Clock } from './clock.ts';
import { BT } from './bt.ts';
import { Display } from './display.ts';
import { Game } from './game.ts';
import { storageService } from '../service/index.service.ts';
import { Storage } from './model.ts';

export class Config implements Storage<Config>{

  // Config to store
  humans!: Human[];
  bots!: Bot[];
  clocks!: Clock[];
  bts!: BT[];
  display!: Display;
  game!: Game;

  constructor(
  ) {
    this.restore();
  }

  restore = () => {
    storageService.load(this);
  }

  name = () => 'config';
  save = () => ({humans: this.humans, bots:this.bots, clocks:this.clocks, bts:this.bts, display:this.display, game:this.game} as Config);
  load = (restore:Config) => {
    this.humans = Human.restore(restore.humans);
    this.bots = Bot.restore(restore.bots);
    this.clocks = Clock.restore(restore.clocks);
    this.bts = BT.restore(restore.bts);
    this.display = Display.restore(restore.display);
    this.game = restore.game ?? new Game('User', 'Stockfish easy', '');
  }

}
