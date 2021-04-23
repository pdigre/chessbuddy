import React from 'react';
import styles from '../styles.module.scss';
import { useGlobalState } from '../data/state';
import { game } from '../data/game';
import { observer } from 'mobx-react';
import { Helper } from '../data/helper';
import { Rendering } from '../data/rendering';

export const CP = observer(({ helper, rendering }: { helper: Helper; rendering: Rendering }) => {
  const [rotation] = useGlobalState('rotation');
  const g = game;
  const cp = helper.cp;
  const blackTop = rotation > 1;
  const cp2 = isNaN(cp) ? 10000 : Math.abs(cp);
  const whiteLead = cp > 0;
  const txt = `cp ${cp2} ${whiteLead ? 'white' : 'black'}`;
  const h = rendering.height - 150;
  const x = Math.min(h, cp2);
  const s = (h - x) / 2 + 75;
  const isW = whiteLead != blackTop;
  const h1 = (isW ? 0 : x) + s + 'px';
  const h2 = (isW ? x : 0) + s + 'px';
  return (
    <div className={styles.CP}>
      <div className={!blackTop ? styles.CPBLACK : styles.CPWHITE} style={{ height: h1 }}>
        {txt}
      </div>
      <div className={blackTop ? styles.CPBLACK : styles.CPWHITE} style={{ height: h2 }}>
        {txt}
      </div>
    </div>
  );
});
