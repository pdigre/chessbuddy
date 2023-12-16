import { GETSET, Item } from './model.ts';

export class Display implements Item {
  constructor(
    public showFacts: boolean,
    public showHints: boolean,
    public showCP: boolean,
    public playCorrect: boolean,
    public playMistake: boolean,
    public playWinner: boolean,
    public rotation: number
  ) {}
  label = 'Display';
  bool: (v: any) => boolean = v => 'true' == v || v == true;
  properties: Map<string, GETSET<any>> = new Map([
    [
      'showFacts',
      {
        get: () => this.showFacts,
        set: value => (this.showFacts = this.bool(value)),
      },
    ],
    [
      'showHints',
      {
        get: () => this.showHints,
        set: value => (this.showHints = this.bool(value)),
      },
    ],
    ['showCP', { get: () => this.showCP, set: value => (this.showCP = this.bool(value)) }],
    [
      'playCorrect',
      {
        get: () => this.playCorrect,
        set: value => (this.playCorrect = this.bool(value)),
      },
    ],
    [
      'playMistake',
      {
        get: () => this.playMistake,
        set: value => (this.playMistake = this.bool(value)),
      },
    ],
    [
      'playWinner',
      {
        get: () => this.playWinner,
        set: value => (this.playWinner = this.bool(value)),
      },
    ],
    ['rotation', { get: () => this.rotation, set: value => (this.rotation = value) }],
  ]);
  getName = () => 'display';
  getDescription = () => 'Display';
  validate: () => string = () => '';
  public static init = new Display(true, true, true, false, false, false, 1);
}
