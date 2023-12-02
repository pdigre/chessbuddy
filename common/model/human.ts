import { ConfigProp, ListItem } from '../service/config.service';

export class Human implements ListItem {
  constructor(
    public name: string,
    public email: string
  ) {}
  label = 'Human';
  properties: Map<string, ConfigProp<string>> = new Map([
    ['name', { get: () => this.name, set: value => (this.name = value) }],
    ['email', { get: () => this.email, set: value => (this.email = value) }],
  ]);
  getName = () => this.name;
  getDescription = () => this.email;
  validate: () => string = () => (this.name.length ? '' : 'Need to enter a name');

  public static init = [new Human('User', '')];
  public static create: () => Human = () => new Human('', '');
}
