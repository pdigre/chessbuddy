import React from 'react';
import styles from '../styles.module.scss';
import { useGlobalState } from '../data/state';
import { Game } from '../data/game';
import { toMMSS } from '../data/library';
import { timeKeeper } from '../data/timekeeper';
import { observer } from 'mobx-react';

export const PlayerInfo = observer(({ isTop, game }: { isTop: boolean; game: Game }) => {
  const [rotation] = useGlobalState('rotation');
  const g = game;
  const isWhite = isTop == rotation > 1;
  type TIMER = { timer: typeof timeKeeper };
  const Ticker = observer(({ timer }: TIMER) => (
    <span>{toMMSS(timer.getUsed() + (g.isWhiteTurn ? g.wtime : g.btime))}</span>
  ));
  return (
    <p className={isTop && rotation % 2 == 1 ? styles.PlayerRight : styles.Player}>
      {isWhite ? `White: ${g.white}` : `Black: ${g.black}`} &lt;
      {isWhite == g.isWhiteTurn ? (
        <Ticker timer={timeKeeper} />
      ) : (
        toMMSS(isWhite ? g.wtime : g.btime)
      )}{' '}
      &gt;
      {isWhite != g.isWhiteTurn && g.isComplete ? ' ** Winner **' : ''}
    </p>
  );
});
