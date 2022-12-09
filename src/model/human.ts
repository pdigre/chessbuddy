import { ListItem } from './config';

export class Human implements ListItem {
  constructor(public name: string, public email: string) {}
  getName: () => string = () => this.name;
  getDescription: () => string = () => this.email;

  public static init = [new Human('User', '')];
}
