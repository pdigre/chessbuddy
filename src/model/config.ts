import { makeAutoObservable } from 'mobx';
import { Bot } from './bot';
import { Human } from './human';
import { Clock } from './clock';
import { storage } from '../services/storage.service';
import { jsonIgnore } from 'json-ignore';

export interface ListItem {
  getName: () => string;
  getDescription: () => string;
}

export const enum EditMode {
  None = 1,
  EditHuman,
  AddHuman,
  EditBot,
  AddBot,
  EditClock,
  AddClock,
}
type ConfigProps = {
  humans: Human[];
  bots: Bot[];
  clocks: Clock[];
  white: string;
  black: string;
  clock: string;
  rotation: number;
  showHints: boolean;
  showCP: boolean;
  showFacts: boolean;
  playMistake: boolean;
  playCorrect: boolean;
  playWinner: boolean;
};

export class Config {
  static storage = 'config';
  white!: string;
  black!: string;
  clock!: string;
  // Features config
  rotation!: number;
  showHints!: boolean;
  showCP!: boolean;
  showFacts!: boolean;
  playMistake!: boolean;
  playCorrect!: boolean;
  playWinner!: boolean;
  // Config to store
  humans!: Human[];
  bots!: Bot[];
  clocks!: Clock[];

  // Config runtime - no persist
  @jsonIgnore() showTab = -1;
  @jsonIgnore() cursor = -1;
  @jsonIgnore() dialog = EditMode.None;

  constructor() {
    makeAutoObservable(this);
    const restore = storage.restoreObject(Config.storage, {
      white: '',
      black: '',
      clock: '',
      rotation: 0,
      showHints: false,
      showCP: true,
      showFacts: true,
      playMistake: false,
      playCorrect: false,
      playWinner: false,
    }) as ConfigProps;
    // Cannot use object assign directly on "this" due to MOBX
    this.humans = (restore.humans?.length ? restore.humans : Human.init).map(
      x => new Human(x.name, x.email)
    );
    this.bots = (restore.bots?.length ? restore.bots : Bot.init).map(
      x => new Bot(x.name, x.engine, x.skill, x.time, x.depth)
    );
    this.clocks = (restore.clocks?.length ? restore.clocks : Clock.init).map(
      x => new Clock(x.name, x.time)
    );
    this.white = restore.white;
    this.black = restore.black;
    this.clock = restore.clock;
    this.rotation = restore.rotation;
    this.showHints = restore.showHints;
    this.showCP = restore.showCP;
    this.showFacts = restore.showFacts;
    this.playMistake = restore.playMistake;
    this.playCorrect = restore.playCorrect;
    this.playWinner = restore.playWinner;
  }

  store: VoidFunction = () => storage.storeObject(Config.storage, this);
}

export const config = new Config();
