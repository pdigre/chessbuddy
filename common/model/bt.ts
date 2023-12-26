import { GETSET, ListItem } from './model.ts';
import { action } from 'mobx';

export class BT implements ListItem {
  constructor(
    public name: string,
    public description: string
  ) {}
  label = 'BT';
  properties: Map<string, GETSET<string>> = new Map([
    ['name', [() => this.name, v => (this.name = v)]],
  ]);
  getProp = (name: string) => this.properties.get(name)![0]();
  setProp = action((name: string, v: any) => this.properties.get(name)![1](v));
  validate = () => '';
  getName = () => this.name;
  getDescription = () => this.description;

  public static create: () => BT = () => new BT('', '');

  static restore = (bots?: BT[]) =>
    bots?.length ? bots.map(x => new BT(x.name, x.description)) : [new BT('BT1', 'Bluetooth')];
}
