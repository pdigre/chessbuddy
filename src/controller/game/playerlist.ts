import { makeAutoObservable } from 'mobx';
import { Bot } from './player_bot';
import { Player } from './player';
import { Human } from './player_human';

const humansInit = `
Human:User
`;
const botsInit = `
Bot:Stockfish:1::10
Bot:Stockfish:20::10
Bot:Stockfish:20:1:
Bot:Lozza:1::10
Bot:Lozza:20::10
Bot:Lozza:20:1:
`;
export const enum EditMode {
  None = 1,
  Edit,
  Add,
}

/*
 * List of playable bots and humans, is persisted
 */
export class PlayerList {
  players: Player[] = [];
  humans: Human[] = [];
  bots: Bot[] = [];
  edited: Player = new Human('', '');
  cursor = -1;
  addHuman = EditMode.None;
  addBot = EditMode.None;
  constructor() {
    makeAutoObservable(this);
    this.restore(localStorage.getItem('humans') ?? humansInit);
    this.restore(localStorage.getItem('bots') ?? botsInit);
  }

  save: VoidFunction = () => {
    localStorage.setItem('humans', this.humans.map(x => x.toString()).join('\n'));
    localStorage.setItem('bots', this.bots.map(x => x.toString()).join('\n'));
  };

  parsePlayer: (data: string) => void = data => {
    const player = this.createPlayer(data);
    if (player instanceof Human) this.humans.push(player);
    if (player instanceof Bot) this.bots.push(player);
  };

  delPlayer: (name: string) => void = name => {
    const i = this.players.findIndex(x => x.name == name);
    if (i >= 0) this.players.splice(i, 1);
  };

  private createPlayer = (data: string) => {
    if (data.includes('undefined')) return undefined;
    const split = data.split(':');
    switch (split[0]) {
      case 'Bot':
        return new Bot(
          split[1],
          Number.parseInt(split[2]),
          Number.parseInt(split[3]),
          Number.parseInt(split[4])
        );
      case 'Human':
        return new Human(split[1], split.length > 2 ? split[2] : '');
      default:
        return undefined;
    }
  };
  private toString = () => this.players.map(x => x.toString()).join('\n');

  private restore = (data: string) =>
    data
      .replace(/\r/, '')
      .split('\n')
      .forEach(x => this.parsePlayer(x));
}

export const playerList = new PlayerList();
