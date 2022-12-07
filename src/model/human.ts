import { Storable } from '../services/storage.service';
import { ListItem } from './config';

export class Human implements ListItem, Storable {
  constructor(public name: string, public email: string) {}
  getName: () => string = () => this.name;
  getDescription: () => string = () => this.email;
  toString: () => string = () => `${this.name.trim()}:${this.email}`;

  public static init = `User:`;
  public static storage = 'humans';
  public static create(split: string[]): Human {
    return new Human(split[0], split.length > 1 ? split[1] : '');
  }
}
