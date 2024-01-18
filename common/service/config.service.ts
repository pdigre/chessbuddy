import { action, makeAutoObservable } from 'mobx';
import { Bot } from '../model/bot';
import { Human } from '../model/human';
import { Clock } from '../model/clock';
import { BT } from '../model/bt.ts';
import { jsonIgnore } from 'json-ignore';
import {
  playService,
  storageService,
  messageService,
  rulesService as rules,
  editService,
  renderingService,
} from './index.service';
import { Display } from '../model/display.ts';
import { ListItem } from '../model/model.ts';
import { Game } from '../model/game.ts';
import { Square } from './rules.service.ts';

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
  BT,
}

export interface ListProps {
  tab: number;
  title: string;
  getItems: () => ListItem[];
  getCursor: () => number;
  setCursor: (i: number) => void;
  createItem: () => ListItem;
}

export class ConfigService {
  static storage = 'config';

  // Config to store
  humans!: Human[];
  bots!: Bot[];
  clocks!: Clock[];
  bts!: BT[];
  display!: Display;
  game!: Game;

  // Config runtime - no persist
  @jsonIgnore() showConfig = false;
  @jsonIgnore() showTab = 0;
  @jsonIgnore() cursorClock = -1;
  @jsonIgnore() cursorBot = -1;
  @jsonIgnore() cursorHuman = -1;
  @jsonIgnore() cursorBT = -1;
  @jsonIgnore() listType = ListType.None;
  @jsonIgnore() listMode = ListMode.None;
  private newItem: ListItem = Human.create();

  constructor() {
    makeAutoObservable(this);
    const restore = storageService.restoreObject(ConfigService.storage, {}) as {
      humans: Human[];
      bots: Bot[];
      clocks: Clock[];
      bts: BT[];
      display: Display;
      game: Game;
    };
    // Cannot use object assign directly on "this" due to MOBX
    this.humans = Human.restore(restore.humans);
    this.bots = Bot.restore(restore.bots);
    this.clocks = Clock.restore(restore.clocks);
    this.bts = BT.restore(restore.bts);
    this.display = Display.restore(restore.display);
    this.game = Game.restore(restore.game);
  }

  store: VoidFunction = () => {
    storageService.storeObject(ConfigService.storage, this);
    storageService.save(renderingService);
  };

  // ****************************
  // Actions
  // ****************************
  openConfigAction = action(() => {
    this.showConfig = true;
    playService.isPlaying = false;
    console.log('openConfigAction');
  });

  closeConfigAction = action(() => {
    this.showConfig = false;
    this.store();
  });

  switchTab(n: number) {
    this.showTab = n;
  }

  setListMode(mode: ListMode) {
    this.listMode = mode;
  }

  isEdit() {
    return this.listMode == ListMode.Edit;
  }

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
    [
      ListType.BT,
      {
        tab: 5,
        title: 'Bluetooth',
        getItems: () => this.bts,
        getCursor: () => this.cursorBT,
        setCursor: (i: number) => (this.cursorBT = i),
        createItem: () => BT.create(),
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
      onSelect: action((i: string) => {
        const c = Number.parseInt(i);
        listProps.setCursor(c == cursor ? -1 : c);
      }),
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

  getBoardLogic() {
    const rotation = renderingService.rotation;
    const { r90, r180 } = rules.splitRotation(rotation);
    const b2sq = (board: Square) => rules.board2Square(board, rotation);
    return {
      rotation,
      r90,
      r180,
      b2sq,
      sq2b: (square: Square) => (r90 ? rules.rightSquare(square) : square),
      fen2b: (fen: string) => (r90 ? rules.leftFen(fen) : fen),
      pieceDropAction: (boardFrom: Square, boardTo: Square) => {
        if (editService.showEdit) {
          editService.editMove(boardFrom, boardTo);
          return true;
        }
        return playService.pieceMove(b2sq(boardFrom), b2sq(boardTo));
      },
    };
  }
}
