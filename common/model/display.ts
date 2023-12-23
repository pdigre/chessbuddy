import { GETSET, Item } from './model.ts';

export class Display implements Item {
  constructor(
    public showFacts: boolean,
    public showHints: boolean,
    public showCP: boolean,
    public playCorrect: boolean,
    public playMistake: boolean,
    public playWinner: boolean
  ) {}
  bool: (v: any) => boolean = v => 'true' == v || v == true;
  properties: Map<string, GETSET<any>> = new Map([
    ['showFacts', [() => this.showFacts, v => (this.showFacts = this.bool(v))]],
    ['showHints', [() => this.showHints, v => (this.showHints = this.bool(v))]],
    ['showCP', [() => this.showCP, v => (this.showCP = this.bool(v))]],
    ['playCorrect', [() => this.playCorrect, v => (this.playCorrect = this.bool(v))]],
    ['playMistake', [() => this.playMistake, v => (this.playMistake = this.bool(v))]],
    ['playWinner', [() => this.playWinner, v => (this.playWinner = this.bool(v))]],
  ]);

  static restore = (display?: Display) =>
    new Display(
      display?.showFacts ?? true,
      display?.showHints ?? true,
      display?.showCP ?? true,
      display?.playCorrect ?? false,
      display?.playMistake ?? false,
      display?.playWinner ?? false
    );
}
