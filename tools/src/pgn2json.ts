import { readFileSync, writeFileSync } from 'fs';
const lines = readFileSync('./gaviota-starters.pgn', 'utf8')
  .toString()
  .replace(/(\r\n)/gm, '\n')
  .replace(/(`)/gm, "'")
  .split('\n');
console.log('lines:' + lines.length);

let out: string[] = [];

function fmoves(txt: string) {
  const join: string[] = [];
  txt.split(' ').forEach(part => {
    const move = part.split('.').pop();
    if (move && move != '*') join.push(move);
  });
  return join.join(' ');
}

let moves = '',
  opening = '',
  variation = '';
lines.forEach(line => {
  if (line.startsWith('[')) {
    if (moves) {
      const mvs = fmoves(moves);
      out.push(`${mvs}/${opening}/${variation}`);
      opening = '';
      variation = '';
      moves = '';
    }
    if (line.startsWith('[Opening ')) opening = line.split('"')[1];
    if (line.startsWith('[Variation ')) variation = line.split('"')[1];
  } else {
    moves += line;
  }
});
console.log('openings:' + out.length);
writeFileSync(
  'openingdata.ts',
  `
const moves=\`
${out.join('\n')}
\`;
export default moves;
`
);
