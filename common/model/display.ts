import { GETSET, Item } from './model.ts';
import { action } from 'mobx';

export class Display implements Item {
  constructor(
    public showFacts: boolean,
    public showHints: boolean,
    public playCorrect: boolean,
    public playMistake: boolean,
    public playWinner: boolean
  ) {}
  bool: (v: any) => boolean = v => 'true' == v || v == true;
  properties: Map<string, GETSET<any>> = new Map([
    ['showFacts', [() => this.showFacts, v => (this.showFacts = this.bool(v))]],
    ['showHints', [() => this.showHints, v => (this.showHints = this.bool(v))]],
    ['playCorrect', [() => this.playCorrect, v => (this.playCorrect = this.bool(v))]],
    ['playMistake', [() => this.playMistake, v => (this.playMistake = this.bool(v))]],
    ['playWinner', [() => this.playWinner, v => (this.playWinner = this.bool(v))]],
  ]);

  getProp = (name: string) => this.properties.get(name)![0]();
  setProp = action((name: string, v: any) => this.properties.get(name)![1](v));

  static restore = (display?: Display) =>
    new Display(
      display?.showFacts ?? true,
      display?.showHints ?? true,
      display?.playCorrect ?? false,
      display?.playMistake ?? false,
      display?.playWinner ?? false
    );
}
