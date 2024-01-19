export class Display {
  constructor(
    public showFacts = true,
    public showHints = true,
    public playCorrect = false,
    public playMistake = false,
    public playWinner = false
  ) {}
  static initial = new Display();
}
