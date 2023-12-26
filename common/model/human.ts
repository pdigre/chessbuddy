import { GETSET, ListItem } from './model.ts';
import { action } from 'mobx';

export class Human implements ListItem {
  constructor(
    public name: string,
    public email: string
  ) {}
  label = 'Human';
  properties: Map<string, GETSET<any>> = new Map([
    ['name', [() => this.name, v => (this.name = v)]],
    ['email', [() => this.email, v => (this.email = v)]],
  ]);
  getProp = (name: string) => this.properties.get(name)![0]();
  setProp = action((name: string, v: any) => this.properties.get(name)![1](v));

  getName = () => this.name;
  getDescription = () => this.email;
  validate: () => string = () => (this.name.length ? '' : 'Need to enter a name');

  public static create: () => Human = () => new Human('', '');

  static restore = (humans?: Human[]) =>
    humans?.length ? humans.map(x => new Human(x.name, x.email)) : [new Human('User', '')];
}
