import { action, makeObservable, observable } from 'mobx';
import { Bot } from '../model/bot';
import { Human } from '../model/human';
import { Clock } from '../model/clock';
import { BT } from '../model/bt.ts';
import {
  playService,
  messageService,
  rulesService as rules,
  editService,
  renderingService, storageService,
} from './index.service';
import { ListItem } from '../model/model.ts';
import { Square } from './rules.service.ts';
import { Config } from '../model/config.ts';

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

export class ConfigService extends Config{

  // Config runtime - no persist
  showConfig = false;
  showTab = 0;
  cursorClock = -1;
  cursorBot = -1;
  cursorHuman = -1;
  cursorBT = -1;
  listType = ListType.None;
  listMode = ListMode.None;
  private newItem: ListItem = Human.create();

  constructor() {
    super();
    makeObservable(this, {
      showConfig: observable,
      showTab: observable,
      cursorClock: observable,
      cursorBot: observable,
      cursorHuman: observable,
      listType: observable,
      listMode: observable,
      humans: observable,
      bots: observable,
      clocks: observable,
      bts: observable,
      game: observable,
      display: observable,
    });
  }


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
    storageService.save(this);
    storageService.save(renderingService);
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
