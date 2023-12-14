import {action, makeAutoObservable} from 'mobx';
import { Bot } from '../model/bot';
import { Human } from '../model/human';
import { Clock } from '../model/clock';
import { jsonIgnore } from 'json-ignore';
import {
  playService,
  storageService,
  messageService,
  refreshService,
} from './index.service';
import {Display} from "../model/display.ts";
import {GETSET, Item} from "../model/model.ts";

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
  display: Display;
  white: string;
  black: string;
  clock: string;
};

export class ConfigService {
  static storage = 'config';
  white!: string;
  black!: string;
  clock!: string;

  // Config to store
  humans!: Human[];
  bots!: Bot[];
  clocks!: Clock[];
  display!: Display;

  // Config runtime - no persist
  @jsonIgnore() showConfig = false;
  @jsonIgnore() showTab = 0;
  @jsonIgnore() cursorClock = -1;
  @jsonIgnore() cursorBot = -1;
  @jsonIgnore() cursorHuman = -1;
  @jsonIgnore() listType = ListType.None;
  @jsonIgnore() listMode = ListMode.None;
  private newItem: Item = Human.create();

  constructor() {
    makeAutoObservable(this);
    const restore = storageService.restoreObject(ConfigService.storage, {
      white: '',
      black: '',
      clock: '',
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
    const d = restore.display ?? Display.init;
    this.display = new Display(d.darkTheme,d.showFacts,d.showHints,d.showCP,d.playCorrect,d.playMistake,d.playWinner,d.rotation);
    this.white = restore.white;
    this.black = restore.black;
    this.clock = restore.clock;
  }

  properties: Map<string, GETSET<string>> = new Map([
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
//    this.cursor = -1;
  }

  /*
  setCursor(id: string) {
    const num = Number.parseInt(id);
    this.cursor = num == this.cursor ? -1 : num;
  }
   */

  setListType(type: ListType) {
    this.listType = type;
    this.listMode = ListMode.None;
    this.newItem = this.createItem();
  }

  setListMode(mode: ListMode) {
    this.listMode = mode;
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

  getItems(): Item[] {
    return this.getItemsByType(this.listType);
  }

  getItemsByType(n:ListType): Item[] {
    switch (n) {
      case ListType.Human:
        return this.humans;
      case ListType.Bot:
        return this.bots;
      default:
        return this.clocks;
    }
  }

  getCursorByType(n:ListType): number {
    switch (n) {
      case ListType.Human:
        return this.cursorHuman;
      case ListType.Bot:
        return this.cursorBot;
      default:
        return this.cursorClock;
    }
  }

  setCursorByType(n:ListType, i:number) {
    switch (n) {
      case ListType.Human:
        return this.cursorHuman = i;
      case ListType.Bot:
        return this.cursorBot = i;
      default:
        return this.cursorClock = i;
    }
  }

  getTabByType(n:ListType) {
    switch (n) {
      case ListType.Human:
        return 2;
      case ListType.Bot:
        return 3;
      default:
        return 4;
    }

  }

  getItem() {
    return this.isEdit() ? this.getItemsByType(this.listType)[this.getCursorByType(this.listType)] : this.newItem;
  }

  createItem(): Item {
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
    this.display.rotation = (this.display.rotation + 1) % 4;
    refreshService.startRefreshTimer();
    console.log('rotation=' + this.display.rotation);
  };

  getListLogic(type:ListType) {
    const items = this.getItemsByType(type);
    const cursor = this.getCursorByType(type);
    const isEdit = this.listMode == ListMode.Edit;
    const item = isEdit ? items[cursor] : this.newItem
    const active = this.showTab == this.getTabByType(type);
    return {
      type,
      items,
      item,
      cursor,
      hasSelect : cursor >= 0,
      show : this.listMode !== ListMode.None && active,
      onSelect : action((i: string) => this.setCursorByType(type, Number.parseInt(i))),
      onSave : action(() => {
        if (item.validate()) {
          const name = isEdit ? 'Save' : 'Add';
          messageService.display({
            name,
            title: name + this.getTitleType(),
            msg: item.validate(),
          });
        } else {
          isEdit ? (items[cursor] = item) : items.push(item);
        }
        this.setCursorByType(type, -1);
        this.listMode = ListMode.None;
      }),
      onAdd : action(() => this.setListMode(ListMode.Add)),
      onEdit : action(() => this.setListMode(ListMode.Edit)),
      onDelete : action(() => {
        items.splice(cursor, 1);
        this.setCursorByType(type, -1);
      }),
    }
  }
}
