import React from 'react';
import styles from '../styles.module.scss';
import { useGlobalState } from '../data/state';
import { gamerunner } from '../data/game';
import { toMMSS } from '../data/library';
import { Ticker } from './Ticker';

export const PlayerInfo: React.FC<{ isTop: boolean }> = ({ isTop }) => {
  const [fen] = useGlobalState('fen'); // Get event
  const [rotation] = useGlobalState('rotation');
  const [cp] = useGlobalState('cp');
  const g = gamerunner.getGame();
  const isWhite = isTop == rotation > 1;

  return (
    <p className={isTop && rotation % 2 == 1 ? styles.PlayerRight : styles.Player}>
      {isWhite ? `White: ${g.white}` : `Black: ${g.black}`} &lt;
      {isWhite == g.isWhiteTurn ? <Ticker /> : toMMSS(isWhite ? g.wtime : g.btime)} &gt;
      {isWhite != g.isWhiteTurn && g.isComplete ? ' *WIN*' : ''}
      {!isTop ? ` , cp ${Math.abs(cp)} ${cp > 0 ? 'white' : 'black'}` : ''}
    </p>
  );
};
