import { Bot } from './bots';
import { Player } from './player';

export class Human extends Player {
  toString = () => `Human:${this.name}`;
}

const parseInt = (num: string) => (num ? Number.parseInt(num) : undefined);

export const addPlayer = (data: string) => {
  const player = createPlayer(data);
  if (player) players.push(player);
};

export const delPlayer = (name: string) => {
  const i = players.findIndex(x => x.name == name);
  if (i >= 0) players.splice(i, 1);
};

const createPlayer = (data: string) => {
  if (data.includes('undefined')) return undefined;
  const split = data.split(':');
  if (split[0] == 'Bot') {
    return new Bot(split[1], parseInt(split[2]) as number, parseInt(split[3]), parseInt(split[4]));
  }
  if (split[0] == 'Human') {
    return new Human(split[1]);
  }
  return undefined;
};

export const toString = () => players.map(x => x.toString()).join('\n');

const restore = (data: string) =>
  data
    .replaceAll('\r', '')
    .split('\n')
    .forEach(x => addPlayer(x));

export const playerInit = `
Human:User
Bot:Stockfish:1::10
Bot:Stockfish:20::10
Bot:Stockfish:20:1:
Bot:Lozza:1::10
Bot:Lozza:20::10
Bot:Lozza:20:1:
`;

const players: Player[] = [];
export const getPlayers = () => {
  if (!players?.length) {
    const pdata = localStorage.getItem('playerdata') ?? playerInit;
    players.splice(0, players.length);
    restore(pdata);
  }
  return players;
};

export const setPlayers = () => {
  localStorage.setItem('playerdata', toString());
};
