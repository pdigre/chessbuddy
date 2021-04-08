import { createGlobalState } from 'react-hooks-global-state';
import { replay } from './rules';

type Initial = {
  // game
  white: string;
  black: string;
  wtime: number;
  btime: number;
  cp: number;
  fen: string;
  log: string[];
  time: number;
  playing: boolean;
  // account: {
  email: string;
  // config: {
  rotation: number;
  markLog: number;
  showConfig: boolean;
  showHints: boolean;
  showFacts: boolean;
  showStats: boolean;
};

const exist_game = (localStorage.getItem('game') ?? new Date().getTime() + ';User;User;0;0;').split(
  ';'
);
const exist_moves = exist_game[5] ? exist_game[5].split(' ') : [];

export const initial: Initial = {
  // game
  white: exist_game[1],
  black: exist_game[2],
  wtime: Number.parseInt(exist_game[3]),
  btime: Number.parseInt(exist_game[4]),
  cp: 0,
  fen: replay(exist_moves, exist_moves.length),
  log: exist_moves,
  time: Number.parseInt(exist_game[0]),
  playing: false,
  // account: {
  email: '',
  // config: {
  rotation: 0,
  markLog: -1,
  showConfig: false,
  showHints: false,
  showFacts: true,
  showStats: false,
};
export const { useGlobalState } = createGlobalState(initial);
