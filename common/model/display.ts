import {GETSET, Item} from "./model.ts";

export class Display implements Item {
  constructor(
  public darkTheme: boolean,
  public showFacts: boolean,
  public showHints: boolean,
  public showCP: boolean,
  public playCorrect: boolean,
  public playMistake: boolean,
  public playWinner: boolean,
  public rotation: number,
  ) {}
  label = 'Display';
  properties: Map<string, GETSET<any>> = new Map([
    ['darkTheme', { get: () => this.darkTheme, set: value => (this.darkTheme = value) }],
    ['showFacts', { get: () => this.showFacts, set: value => (this.showFacts = value) }],
    ['showHints', { get: () => this.showHints, set: value => (this.showHints = value) }],
    ['showCP', { get: () => this.showCP, set: value => (this.showCP = value) }],
    ['playCorrect', { get: () => this.playCorrect, set: value => (this.playCorrect = value) }],
    ['playMistake', { get: () => this.playMistake, set: value => (this.playMistake = value) }],
    ['playWinner', { get: () => this.playWinner, set: value => (this.playWinner = value) }],
    ['rotation', { get: () => this.rotation, set: value => (this.rotation = value) }],
  ]);
  getName = () => "display";
  getDescription = () => "Display";
  validate: () => string = () => "";
  public static init = new Display(false, true, true, true, false, false, false, 1);

}
