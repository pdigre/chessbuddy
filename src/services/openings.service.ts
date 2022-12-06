import moves from './util/openingdata';

export class San {
  info: string | undefined;
  children: San[] = [];
  constructor(public san: string) {}
}

export class OpeningsService {
  tree: San[] = [];

  constructor() {
    moves.split('\n').forEach(line => {
      const parts = line.split('/');
      const san = this.create(parts[0].split(' '));
      san.info = parts[1] + '/' + parts[2];
    });
  }

  create: (moves: string[]) => San = moves => {
    let ch = this.tree;
    let san: San | undefined;
    moves.forEach(move => {
      san = ch.find(s => s.san == move);
      if (san) {
        ch = san.children;
      } else {
        san = new San(move);
        ch.push(san);
        ch = san.children;
      }
    });
    return san as San;
  };

  locate: (moves: string[]) => San | undefined = moves => {
    let ch = this.tree;
    let san: San | undefined;
    for (const move of moves) {
      san = ch.find(s => s.san == move);
      if (san) {
        ch = san.children;
      } else {
        return undefined;
      }
    }
    return san;
  };

  sanTextLocate: (moves: string[]) => string = (moves: string[]) =>
    this.sanText(this.locate(moves));

  sanText: (san: San | undefined) => string = san => {
    if (san && san.info) return san.info.replace(/\//, ' - ');
    if (san && san.children.length) return this.sanText(san.children[0]);
    return '';
  };
}
export const openingsService = new OpeningsService();
