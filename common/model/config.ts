import { Human } from './human.ts';
import { Bot } from './bot.ts';
import { Clock } from './clock.ts';
import { BT } from './bt.ts';
import { Display } from './display.ts';
import { Game } from './game.ts';
import { storageService } from '../service/index.service.ts';
import { Persist } from './model.ts';

export class Config implements Persist {
  persist = () => ({
    name: 'config',
    init: {
      humans: Human.initial,
      bots: Bot.initial,
      clocks: Clock.initial,
      bts: BT.initial,
      display: Display.initial,
      game: Game.initial,
    },
  });

  constructor(
    public humans = Human.initial,
    public bots = Bot.initial,
    public clocks = Clock.initial,
    public bts = BT.initial,
    public display = Display.initial,
    public game = Game.initial
  ) {
    storageService.load(this);
    this.humans = this.humans.map(h => new Human(h.name, h.email));
    this.bots = this.bots.map(b => new Bot(b.name, b.engine, b.skill, b.time, b.depth));
    this.clocks = this.clocks.map(c => new Clock(c.name, c.time));
    this.bts = this.bts.map(b => new BT(b.name, b.description));
    this.display = this.initialize(new Display(), this.display);
    this.game = this.initialize(new Game(), this.game);
  }

  private initialize<T extends Object>(obj: T, props: Object) {
    Object.assign(obj, props);
    return obj;
  }
}
