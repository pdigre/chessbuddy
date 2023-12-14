import { action, makeAutoObservable } from 'mobx';
import { Bot } from '../model/bot';
import { Human } from '../model/human';
import { Clock } from '../model/clock';
import { jsonIgnore } from 'json-ignore';
import { playService, storageService, messageService, refreshService } from './index.service';
import { Display } from '../model/display.ts';
import { Item } from '../model/model.ts';
import { Game } from '../model/game.ts';

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

export interface ListProps {
  tab: number;
  title: string;
  getItems: () => Item[];
  getCursor: () => number;
  setCursor: (i: number) => void;
  createItem: () => Item;
}

export class ConfigService {
  static storage = 'config';

  // Config to store
  humans!: Human[];
  bots!: Bot[];
  clocks!: Clock[];
  display!: Display;
  game!: Game;

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
    const restore = storageService.restoreObject(ConfigService.storage, {}) as {
      humans: Human[];
      bots: Bot[];
      clocks: Clock[];
      display: Display;
      game: Game;
    };
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
    this.display = new Display(
      d.darkTheme,
      d.showFacts,
      d.showHints,
      d.showCP,
      d.playCorrect,
      d.playMistake,
      d.playWinner,
      d.rotation
    );
    const g = restore.game ?? Game.init;
    this.game = new Game(g.white, g.black, g.clock);
  }

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
  }

  setListMode(mode: ListMode) {
    this.listMode = mode;
  }

  isEdit() {
    return this.listMode == ListMode.Edit;
  }

  rotateAction = action(() => {
    const num = this.display.rotation;
    this.display.rotation = (Number.isInteger(num) ? num + 1 : 0) % 4;
    refreshService.startRefreshTimer();
  });

  ListTypes = new Map<ListType, ListProps>([
    [
      ListType.Human,
      {
        tab: 2,
        title: 'Human',
        getItems: () => this.humans,
        getCursor: () => this.cursorHuman,
        setCursor: (i: number) => (this.cursorHuman = i),
        createItem: () => Human.create(),
      },
    ],
    [
      ListType.Bot,
      {
        tab: 3,
        title: 'Bot',
        getItems: () => this.bots,
        getCursor: () => this.cursorBot,
        setCursor: (i: number) => (this.cursorBot = i),
        createItem: () => Bot.create(),
      },
    ],
    [
      ListType.Clock,
      {
        tab: 4,
        title: 'Clock',
        getItems: () => this.clocks,
        getCursor: () => this.cursorClock,
        setCursor: (i: number) => (this.cursorClock = i),
        createItem: () => Clock.create(),
      },
    ],
  ]);

  getListLogic(type: ListType) {
    const listProps = this.ListTypes.get(type)!;
    const items = listProps.getItems();
    const cursor = listProps.getCursor();
    const isEdit = this.listMode == ListMode.Edit;
    const item = isEdit ? items[cursor] : this.newItem;
    const active = this.showTab == listProps.tab;
    return {
      type,
      items,
      item,
      cursor,
      isEdit,
      hasSelect: cursor >= 0,
      show: this.listMode !== ListMode.None && active,
      onSelect: action((i: string) => listProps.setCursor(Number.parseInt(i))),
      onSave: action(() => {
        if (item.validate()) {
          const name = isEdit ? 'Save' : 'Add';
          messageService.display({
            name,
            title: name + listProps.title,
            msg: item.validate(),
          });
        } else {
          isEdit ? (items[cursor] = item) : items.push(item);
        }
        listProps.setCursor(-1);
        this.listMode = ListMode.None;
      }),
      onAdd: action(() => this.setListMode(ListMode.Add)),
      onEdit: action(() => this.setListMode(ListMode.Edit)),
      onDelete: action(() => {
        items.splice(cursor, 1);
        listProps.setCursor(-1);
      }),
    };
  }
}
