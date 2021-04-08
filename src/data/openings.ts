import moves from './openingdata';

export class San {
  san: string;
  info: string | undefined;
  children: San[] = [];
  constructor(san: string) {
    this.san = san;
  }
}

const tree: San[] = [];

const create: (moves: string[]) => San = moves => {
  let ch = tree;
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

const lines = moves.split('\n');
lines.forEach(line => {
  const parts = line.split('/');
  const san = create(parts[0].split(' '));
  san.info = parts[1] + '/' + parts[2];
});

export const locate: (moves: string[]) => San | undefined = moves => {
  let ch = tree;
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

export const sanText: (san: San | undefined) => string = san => {
  if (san && san.info) return san.info.replaceAll('/', ' - ');
  if (san && san.children.length) return sanText(san.children[0]);
  return '';
};
