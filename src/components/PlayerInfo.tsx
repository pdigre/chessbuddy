import React from 'react';
import styles from '../styles.module.scss';
import { useGlobalState } from '../data/state';
import { game } from '../data/game';
import { toMMSS } from '../data/library';
import { timeKeeper } from '../data/timekeeper';
import { observer } from 'mobx-react';
import { Helper } from '../data/helper';

type PlayerInfoType = { isTop: boolean; helper: Helper };

export const PlayerInfo = observer(({ isTop, helper }: PlayerInfoType) => {
  const [rotation] = useGlobalState('rotation');
  const g = game;
  const isWhite = isTop == rotation > 1;
  type TIMER = { timer: typeof timeKeeper };
  const Ticker = observer(({ timer }: TIMER) => (
    <span>{toMMSS(timer.getUsed() + (g.isWhiteTurn ? g.wtime : g.btime))}</span>
  ));
  const cp = helper.cp;
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
      {!isTop ? ` , cp ${Math.abs(cp)} ${cp > 0 ? 'white' : 'black'}` : ''}
    </p>
  );
});
