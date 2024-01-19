import { Human } from './human.ts';
import { Bot } from './bot.ts';
import { Clock } from './clock.ts';
import { BT } from './bt.ts';
import { Display } from './display.ts';
import { Game } from './game.ts';
import { storageService } from '../service/index.service.ts';
import { Persist } from './model.ts';

export class Config implements Persist {
  static initial = {
    humans: Human.initial,
    bots: Bot.initial,
    clocks: Clock.initial,
    bts: BT.initial,
    display: Display.initial,
    game: Game.initial,
  };

  // Config to store
  humans!: Human[];
  bots!: Bot[];
  clocks!: Clock[];
  bts!: BT[];
  display!: Display;
  game!: Game;

  constructor() {
    storageService.load(this);
    this.humans = this.humans.map((h) => new Human(h.name, h.email));
    this.bots = this.bots.map((b) => new Bot(b.name, b.engine, b.skill, b.time, b.depth));
    this.clocks = this.clocks.map((c) => new Clock(c.name, c.time));
    this.bts = this.bts.map((b) => new BT(b.name, b.description));
    this.display = this.initialize(new Display(), this.display);
    this.game = this.initialize(new Game(), this.game);
  }

  private initialize<T extends Object>(obj: T, props: Object) {
    Object.assign(obj, props);
    return obj;
  }

  name = () => 'config';
  init = () => Config.initial;
}
