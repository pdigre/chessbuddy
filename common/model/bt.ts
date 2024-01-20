import { ListItem } from './model.ts';

export class BT implements ListItem {
  constructor(
    public name = '',
    public description = ''
  ) {}
  label = 'BT';
  validate = () => '';
  getName = () => this.name;
  getDescription = () => this.description;

  public static create: () => BT = () => new BT();

  public static initial = [new BT('BT1', 'Bluetooth')];
}
