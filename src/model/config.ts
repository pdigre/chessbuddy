import { makeAutoObservable, runInAction } from 'mobx';
import { Bot } from './bot';
import { Human } from './human';
import { Clock } from './clock';
import { jsonIgnore } from 'json-ignore';
import { refreshtimer } from '../services/control/refreshtimer';
import { playService, storageService } from '../services/index.service';
import { theme } from '../services/control/theme';

export interface ListItem {
  getName: () => string;
  getDescription: () => string;
}

export const enum ConfigMode {
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
  darkTheme: boolean;
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
  darkTheme!: boolean;
  // Config to store
  humans!: Human[];
  bots!: Bot[];
  clocks!: Clock[];

  // Config runtime - no persist
  @jsonIgnore() showConfig = false;
  @jsonIgnore() showTab = 0;
  @jsonIgnore() cursor = -1;
  @jsonIgnore() dialog = ConfigMode.None;

  constructor() {
    makeAutoObservable(this);
    const restore = storageService.restoreObject(Config.storage, {
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
      darkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches,
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
    this.darkTheme = restore.darkTheme;
    this.applyTheme();
  }

  store: VoidFunction = () => storageService.storeObject(Config.storage, this);

  // ****************************
  // Actions
  // ****************************
  openConfig() {
    runInAction(() => {
      this.showConfig = true;
      playService.isPlaying = false;
    });
  }

  closeConfig() {
    runInAction(() => {
      this.showConfig = false;
    });
    this.store();
    refreshtimer.startRefreshTimer();
  }

  switchTab(n: number) {
    runInAction(() => {
      this.showTab = n;
      this.cursor = -1;
    });
  }

  setCursor(id: string) {
    runInAction(() => {
      const num = Number.parseInt(id);
      this.cursor = num == this.cursor ? -1 : num;
    });
  }
  deleteItem<T>(items: T[]) {
    runInAction(() => {
      items.splice(this.cursor, 1);
      this.cursor = -1;
    });
  }
  closeDialog() {
    runInAction(() => {
      this.cursor = -1;
      this.dialog = ConfigMode.None;
    });
  }
  openDialog(mode: ConfigMode) {
    runInAction(() => {
      this.dialog = mode;
    });
  }

  applyTheme() {
    runInAction(() => {
      theme.darkTheme = this.darkTheme;
      this.darkTheme
        ? window.document.documentElement.classList.add('dark')
        : window.document.documentElement.classList.remove('dark');
    });
  }
}
