export class Game {
  constructor(
    public white: string,
    public black: string,
    public clock: string
  ) {}

  static restore = (game?: Game) =>
    new Game(game?.white ?? 'User', game?.black ?? 'Stockfish easy', game?.clock ?? '');
}
