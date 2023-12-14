import {GETSET, Item} from "./model.ts";

export class Game implements Item {
  constructor(
  public white: string,
  public black: string,
  public clock: string,
  ) {}
  label = 'Display';
  properties: Map<string, GETSET<any>> = new Map([
    ['white', { get: () => this.white, set: value => (this.white = value) }],
    ['black', { get: () => this.black, set: value => (this.black = value) }],
    ['clock', { get: () => this.clock, set: value => (this.clock = value) }],
  ]);
  getName = () => "game";
  getDescription = () => "Game";
  validate: () => string = () => "";
  public static init = new Game("", "", "");

}
