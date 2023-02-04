import { makeAutoObservable, runInAction } from 'mobx';
import { Bot } from './bot';
import { Human } from './human';
import { Clock } from './clock';
import { jsonIgnore } from 'json-ignore';
import {
  playService,
  storageService,
  messageService,
  renderingService,
  refreshService,
} from '../service/index.service';

export interface ConfigProp<T> {
  get: () => T;
  set: (key: T) => void;
}

export interface ListItem {
  label: string;
  properties: Map<string, ConfigProp<string>>;
  getName: () => string;
  getDescription: () => string;
  validate: () => string;
}

export const enum ListMode {
  None = 1,
  Edit,
  Add,
}
export const enum ListType {
  None = 1,
  Human,
  Bot,
  Clock,
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

export class ConfigService {
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
  @jsonIgnore() showConfig = false;
  @jsonIgnore() showTab = 0;
  @jsonIgnore() cursor = -1;
  @jsonIgnore() listType = ListType.None;
  @jsonIgnore() listMode = ListMode.None;

  constructor() {
    makeAutoObservable(this);
    const restore = storageService.restoreObject(ConfigService.storage, {
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

  /*
  rotation!: number;
  showHints!: boolean;
  showCP!: boolean;
  showFacts!: boolean;
  playMistake!: boolean;
  playCorrect!: boolean;
  playWinner!: boolean;
*/
  boolprops: Map<string, ConfigProp<boolean>> = new Map([
    [
      'darkTheme',
      { get: () => renderingService.darkTheme, set: value => (renderingService.darkTheme = value) },
    ],
    ['showHints', { get: () => this.showHints, set: value => (this.showHints = value) }],
    ['showCP', { get: () => this.showCP, set: value => (this.showCP = value) }],
    ['showFacts', { get: () => this.showFacts, set: value => (this.showFacts = value) }],
    ['playMistake', { get: () => this.playMistake, set: value => (this.playMistake = value) }],
    ['playCorrect', { get: () => this.playCorrect, set: value => (this.playCorrect = value) }],
    ['playWinner', { get: () => this.playWinner, set: value => (this.playWinner = value) }],
  ]);

  store: VoidFunction = () => storageService.storeObject(ConfigService.storage, this);

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
    runInAction(() => (this.showConfig = false));
    this.store();
    refreshService.startRefreshTimer();
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
  deleteItem() {
    runInAction(() => {
      const items = this.getItems();
      items.splice(this.cursor, 1);
      this.cursor = -1;
    });
  }

  closePopup = () => {
    runInAction(() => {
      this.cursor = -1;
      this.listMode = ListMode.None;
    });
  };

  setListType(type: ListType) {
    runInAction(() => {
      this.listType = type;
      this.listMode = ListMode.None;
    });
  }

  setListMode(mode: ListMode) {
    runInAction(() => {
      this.listMode = mode;
    });
  }

  saveItem(item: ListItem, items: ListItem[]) {
    if (item.validate()) {
      messageService.display((this.isEdit() ? 'Save' : 'Add') + this.titleType(), item.validate());
    } else {
      this.isEdit() ? (items[this.cursor] = item) : items.push(item);
    }
    this.closePopup();
  }
  isEdit() {
    return this.listMode == ListMode.Edit;
  }
  titleType() {
    switch (this.listType) {
      case ListType.Human:
        return 'Human';
      case ListType.Bot:
        return 'Bot';
      default:
        return 'Clock';
    }
  }

  getItems(): ListItem[] {
    switch (this.listType) {
      case ListType.Human:
        return this.humans;
      case ListType.Bot:
        return this.bots;
      default:
        return this.clocks;
    }
  }

  getItem() {
    return this.isEdit() ? this.getItems()[this.cursor] : this.createItem();
  }

  createItem(): ListItem {
    switch (this.listType) {
      case ListType.Human:
        return Human.create();
      case ListType.Bot:
        return Bot.create();
      default:
        return Clock.create();
    }
  }

  setClock(value: string) {
    runInAction(() => (this.clock = value));
  }
  setBlack(value: string) {
    runInAction(() => (this.black = value));
  }
  setWhite(value: string) {
    runInAction(() => (this.white = value));
  }

  r90 = () => this.rotation % 2 == 1;
  r180 = () => this.rotation > 1;
}
