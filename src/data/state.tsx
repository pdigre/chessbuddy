import { createGlobalState } from 'react-hooks-global-state';

const initial = {
  rotation: 0,
  markLog: -1,
  showConfig: false,
  showHints: false,
  showFacts: true,
  showStats: false,
};
export type Initial = typeof initial;
export const { useGlobalState } = createGlobalState(initial);
