import { Player } from './player';

export class Human extends Player {
  constructor(name: string, public email: string) {
    super(name);
  }
  toString: () => string = () => `Human:${this.name}:${this.email}`;
}
