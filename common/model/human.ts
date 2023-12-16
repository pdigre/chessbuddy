import { GETSET, Item } from './model.ts';

export class Human implements Item {
  constructor(
    public name: string,
    public email: string
  ) {}
  label = 'Human';
  properties: Map<string, GETSET<any>> = new Map([
    ['name', [() => this.name, v => (this.name = v)]],
    ['email', [() => this.email, v => (this.email = v)]],
  ]);
  getName = () => this.name;
  getDescription = () => this.email;
  validate: () => string = () => (this.name.length ? '' : 'Need to enter a name');

  public static init = [new Human('User', '')];
  public static create: () => Human = () => new Human('', '');
}
