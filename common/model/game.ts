export class Game {
  constructor(
    public white = 'User',
    public black = 'Stockfish easy',
    public clock = ''
  ) {}

  public static initial = new Game('User', 'Stockfish easy', '');
}
