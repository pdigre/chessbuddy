import { ListItem } from './model.ts';

export class Human implements ListItem {
  constructor(
    public name = '',
    public email = ''
  ) {}

  label = 'Human';

  getName = () => this.name;
  getDescription = () => this.email;
  validate: () => string = () => (this.name.length ? '' : 'Need to enter a name');

  public static create: () => Human = () => new Human();

  public static initial = [new Human("User","")];
}
