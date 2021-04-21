import { createGlobalState } from 'react-hooks-global-state';

const initial = {
  rotation: 0,
  markLog: -1,
  markHist: -1,
  showConfig: false,
  showHints: true,
  showFacts: true,
  showHist: false,
};
export type Initial = typeof initial;
export const { useGlobalState } = createGlobalState(initial);
