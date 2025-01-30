import * as model from './model';

export class BT implements model.ListItem {
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
