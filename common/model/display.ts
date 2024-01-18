export class Display {
  constructor(
    public showFacts: boolean,
    public showHints: boolean,
    public playCorrect: boolean,
    public playMistake: boolean,
    public playWinner: boolean
  ) {}
  static restore = (display?: Display) =>
    new Display(
      display?.showFacts ?? true,
      display?.showHints ?? true,
      display?.playCorrect ?? false,
      display?.playMistake ?? false,
      display?.playWinner ?? false
    );
}
