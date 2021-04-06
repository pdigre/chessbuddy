import React, { useState } from 'react';
import { useGlobalState } from '../data/state';
import { gamerunner } from '../data/game';
import { TimeKeeper, toMMSS } from '../data/library';

export const Ticker: React.FC = () => {
  const [isPlaying] = useGlobalState('playing');
  const g = gamerunner.getGame();
  const [time, setTime] = useState(new Date().getTime());

  TimeKeeper.ticker = () => {
    const time = TimeKeeper.update(isPlaying);
    if (isPlaying) setTime(time);
  };

  return <span>{toMMSS(TimeKeeper.getUsed() + (g.isWhiteTurn ? g.wtime : g.btime))}</span>;
};
