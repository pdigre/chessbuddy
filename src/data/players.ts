import { makeAutoObservable } from 'mobx';
import { Bot } from './bots';
import { Player } from './player';

export class Human extends Player {
  email: string;
  toString = () => `Human:${this.name}:${this.email}`;
  constructor(name: string, email?: string) {
    super(name);
    this.email = email ?? '';
  }
}

const parseInt = (num: string) => (num ? Number.parseInt(num) : undefined);

const playerInit = `
Human:User
Bot:Stockfish:1::10
Bot:Stockfish:20::10
Bot:Stockfish:20:1:
Bot:Lozza:1::10
Bot:Lozza:20::10
Bot:Lozza:20:1:
`;

/*
 * List of playable bots and humans, is persisted
 */
export class Players {
  players: Player[] = [];
  constructor() {
    makeAutoObservable(this);
    const pdata = localStorage.getItem('playerdata') ?? playerInit;
    //    const pdata = playerInit;
    this.restore(pdata);
  }
  save = () => {
    const data = this.toString();
    localStorage.setItem('playerdata', data);
  };
  addPlayer = (data: string) => {
    const player = this.createPlayer(data);
    if (player) this.players.push(player);
  };

  delPlayer = (name: string) => {
    const i = this.players.findIndex(x => x.name == name);
    if (i >= 0) this.players.splice(i, 1);
  };

  private createPlayer = (data: string) => {
    if (data.includes('undefined')) return undefined;
    const split = data.split(':');
    if (split[0] == 'Bot') {
      return new Bot(
        split[1],
        parseInt(split[2]) as number,
        parseInt(split[3]),
        parseInt(split[4])
      );
    }
    if (split[0] == 'Human') {
      return new Human(split[1], split.length > 2 ? split[2] : '');
    }
    return undefined;
  };
  private toString = () => this.players.map(x => x.toString()).join('\n');

  private restore = (data: string) =>
    data
      .replaceAll('\r', '')
      .split('\n')
      .forEach(x => this.addPlayer(x));
}
export const players = new Players();
