import { Bot, UCI_ENGINES, UCI_ENGINE } from './bots';
import { Player } from './player';

export class Human extends Player {
  toString = () => `Human:${this.name}`;
}

const parseInt = (num: string) => (num ? Number.parseInt(num) : undefined);

export const addPlayer = (data: string) => {
  const player = createPlayer(data);
  if (player) players.push(player);
};

const createPlayer = (data: string) => {
  if (data.includes('undefined')) return undefined;
  const split = data.split(':');
  if (split[0] == 'Bot') {
    const engine = UCI_ENGINES.find(x => x.name == split[1]) as UCI_ENGINE;
    return new Bot(engine, parseInt(split[2]) as number, parseInt(split[3]), parseInt(split[4]));
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
export const getPlayers: (func: () => string) => Player[] = (func: () => string) => {
  if (!players.length) {
    const pdata = func();
    players.splice(0, players.length);
    restore(pdata);
  }
  return players;
};
