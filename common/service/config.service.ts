import { makeAutoObservable } from 'mobx';
import { Bot } from '../model/bot';
import { Human } from '../model/human';
import { Clock } from '../model/clock';
import { jsonIgnore } from 'json-ignore';
import {
  playService,
  storageService,
  messageService,
  renderingService,
  refreshService,
} from './index.service';

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
  private newItem: ListItem = Human.create();

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
  @jsonIgnore() boolprops: Map<string, ConfigProp<boolean>> = new Map([
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

  properties: Map<string, ConfigProp<string>> = new Map([
    ['clock', { get: () => this.clock, set: value => (this.clock = value) }],
    ['white', { get: () => this.white, set: value => (this.white = value) }],
    ['black', { get: () => this.black, set: value => (this.black = value) }],
  ]);

  store: VoidFunction = () => storageService.storeObject(ConfigService.storage, this);

  // ****************************
  // Actions
  // ****************************
  openConfigAction = () => {
    this.showConfig = true;
    playService.isPlaying = false;
    console.log('openConfigAction');
  };

  closeConfigAction = () => {
    this.showConfig = false;
    this.store();
    refreshService.startRefreshTimer();
  };

  switchTab(n: number) {
    this.showTab = n;
    this.cursor = -1;
  }

  setCursor(id: string) {
    const num = Number.parseInt(id);
    this.cursor = num == this.cursor ? -1 : num;
  }

  deleteItem() {
    const items = this.getItems();
    items.splice(this.cursor, 1);
    this.cursor = -1;
  }

  closePopupAction = () => {
    this.cursor = -1;
    this.listMode = ListMode.None;
  };

  setListType(type: ListType) {
    this.listType = type;
    this.listMode = ListMode.None;
    this.newItem = this.createItem();
  }

  setListMode(mode: ListMode) {
    this.listMode = mode;
  }

  saveItem(item: ListItem, items: ListItem[]) {
    if (item.validate()) {
      const name = this.isEdit() ? 'Save' : 'Add';
      messageService.display({
        name,
        title: name + this.getTitleType(),
        msg: item.validate(),
      });
    } else {
      this.isEdit() ? (items[this.cursor] = item) : items.push(item);
    }
    this.closePopupAction();
  }

  isEdit() {
    return this.listMode == ListMode.Edit;
  }

  getTitleType() {
    return this.getTitleByType(this.listType);
  }

  getTitleByType(n:ListType) {
    switch (n) {
      case ListType.Human:
        return 'Human';
      case ListType.Bot:
        return 'Bot';
      default:
        return 'Clock';
    }
  }

  getItems(): ListItem[] {
    return this.getItemsByType(this.listType);
  }

  getItemsByType(n:ListType): ListItem[] {
    switch (n) {
      case ListType.Human:
        return this.humans;
      case ListType.Bot:
        return this.bots;
      default:
        return this.clocks;
    }
  }

  getItem() {
    return this.isEdit() ? this.getItems()[this.cursor] : this.newItem;
  }

  getItemByType(n:ListType) {
    return this.isEdit() ? this.getItemsByType(n)[this.cursor] : this.newItem;
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

  rotateAction = () => {
    this.rotation = (this.rotation + 1) % 4;
    refreshService.startRefreshTimer();
    console.log('rotation=' + this.rotation);
  };
}
