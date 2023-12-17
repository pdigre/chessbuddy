import { GETSET, Item } from './model.ts';

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
  public static init = new Game('', '', '');
}
