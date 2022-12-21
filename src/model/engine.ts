export class Engine {
  constructor(public name: string, public path: string) {}
}

export const Engines: Engine[] = [
  new Engine('Stockfish', 'bots/stockfish.js-10.0.2/stockfish.js'),
  new Engine('Lozza', 'bots/lozza-1.18/lozza.js'),
];
