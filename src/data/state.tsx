import { createGlobalState } from 'react-hooks-global-state';

export type Initial = {
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

export const initial: Initial = {
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
