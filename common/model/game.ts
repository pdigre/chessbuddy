import { GETSET, Item } from './model.ts';
import { action } from 'mobx';

export class Game implements Item {
  constructor(
    public white: string,
    public black: string,
    public clock: string
  ) {}
  properties: Map<string, GETSET<any>> = new Map([
    ['white', [() => this.white, v => (this.white = v)]],
    ['black', [() => this.black, v => (this.black = v)]],
    ['clock', [() => this.clock, v => (this.clock = v)]],
  ]);
  getProp = (name: string) => this.properties.get(name)![0]();
  setProp = action((name: string, v: any) => this.properties.get(name)![1](v));
  newItem = () => new Game('User', 'Stockfish easy', '');
}
