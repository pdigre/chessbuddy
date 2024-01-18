import { ListItem } from './model.ts';

export class Human implements ListItem {
  constructor(
    public name: string,
    public email: string
  ) {}
  label = 'Human';

  getName = () => this.name;
  getDescription = () => this.email;
  validate: () => string = () => (this.name.length ? '' : 'Need to enter a name');

  public static create: () => Human = () => new Human('', '');

  static restore = (humans?: Human[]) =>
    humans?.length ? humans.map(x => new Human(x.name, x.email)) : [new Human('User', '')];
}
