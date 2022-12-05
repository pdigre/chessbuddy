import { Storable } from '../services/storage.service';
import { ListItem } from './config';

export class Human implements ListItem, Storable {
  constructor(public name: string, public email: string) {}
  getName: () => string = () => this.name;
  getDescription: () => string = () => this.email;
  toString: () => string = () => `Human:${this.name}:${this.email}`;

  public static init = `
    Human:User
    `;
  public static storage = 'humans';
  public static create(split: string[]): Human {
    return new Human(split[1], split.length > 2 ? split[2] : '');
  }
}
