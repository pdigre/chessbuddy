import { createGlobalState } from 'react-hooks-global-state';
import React from 'react';
import { NEW_GAME } from './rules';

type Initial = {
  // game
  white: string;
  black: string;
  wtime: number;
  btime: number;
  cp: number;
  fen: string;
  history: string[];
  timer: number;
  moves: string[];
  playing: boolean;
  // account: {
  email: string;
  // config: {
  rotation: number;
  markHistory: number;
  showConfig: boolean;
  showHints: boolean;
  showFacts: boolean;
  showStats: boolean;
};

const initial: Initial = {
  // game
  white: 'User',
  black: 'User',
  wtime: 0,
  btime: 0,
  cp: 0,
  fen: NEW_GAME,
  history: [],
  timer: 0,
  moves: [],
  playing: false,
  // account: {
  email: '',
  // config: {
  rotation: 0,
  markHistory: -1,
  showConfig: false,
  showHints: false,
  showFacts: true,
  showStats: false,
};
export const { useGlobalState } = createGlobalState(initial);

export const usePersistentState: (
  key: string,
  defaultValue: string
) => [string, React.Dispatch<React.SetStateAction<string>>] = (key, defaultValue) => {
  const [state, setState] = React.useState(localStorage.getItem(key) || defaultValue);
  React.useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
};
