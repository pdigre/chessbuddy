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
  properties: Map<string, GETSET<any>> = new Map([
    ['showFacts', { get: () => this.showFacts, set: value => (this.showFacts = 'true' == value) }],
    ['showHints', { get: () => this.showHints, set: value => (this.showHints = 'true' == value) }],
    ['showCP', { get: () => this.showCP, set: value => (this.showCP = 'true' == value) }],
    [
      'playCorrect',
      { get: () => this.playCorrect, set: value => (this.playCorrect = 'true' == value) },
    ],
    [
      'playMistake',
      { get: () => this.playMistake, set: value => (this.playMistake = 'true' == value) },
    ],
    [
      'playWinner',
      { get: () => this.playWinner, set: value => (this.playWinner = 'true' == value) },
    ],
    ['rotation', { get: () => this.rotation, set: value => (this.rotation = value) }],
  ]);
  getName = () => 'display';
  getDescription = () => 'Display';
  validate: () => string = () => '';
  public static init = new Display(true, true, true, false, false, false, 1);
}
