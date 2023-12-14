import { GETSET, Item } from './model.ts';

export class Human implements Item {
  constructor(
    public name: string,
    public email: string
  ) {}
  label = 'Human';
  properties: Map<string, GETSET<any>> = new Map([
    ['name', { get: () => this.name, set: value => (this.name = value) }],
    ['email', { get: () => this.email, set: value => (this.email = value) }],
  ]);
  getName = () => this.name;
  getDescription = () => this.email;
  validate: () => string = () => (this.name.length ? '' : 'Need to enter a name');

  public static init = [new Human('User', '')];
  public static create: () => Human = () => new Human('', '');
}
