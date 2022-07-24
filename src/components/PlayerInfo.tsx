import React from 'react';
import { Game } from '../data/game';
import { toMMSS } from '../data/library';
import { timeKeeper } from '../data/timekeeper';
import { observer } from 'mobx-react';
import { Config } from '../data/config';

export const PlayerInfo = observer(
  ({ isTop, game, config }: { isTop: boolean; game: Game; config: Config }) => {
    const g = game;
    const isWhite = isTop == config.rotation > 1;
    type TIMER = { timer: typeof timeKeeper };
    const Ticker = observer(({ timer }: TIMER) => (
      <span>
        {toMMSS(Math.floor(timer.elapsed) + Math.floor(g.isWhiteTurn ? g.wtime : g.btime))}
      </span>
    ));
    const right = isTop && config.rotation % 2 == 1 ? ' text-right' : '';
    const style = 'h-6 text-xl m-0 p-1';

    return (
      <p className={style + right}>
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
  }
);
