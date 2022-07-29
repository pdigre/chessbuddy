import React from 'react';
import { Game } from '../logic/game';
import { toMMSS } from '../logic/library';
import { clock } from '../logic/clock';
import { observer } from 'mobx-react';
import { Config } from '../logic/config';

export const PlayerInfo = observer(
  ({ isTop, game, config }: { isTop: boolean; game: Game; config: Config }) => {
    const g = game;
    const isWhite = isTop == config.rotation > 1;
    type TIMER = { timer: typeof clock };
    const Ticker = observer(({ timer }: TIMER) => (
      <span>
        {toMMSS(Math.floor(timer.elapsed) + Math.floor(g.isWhiteTurn ? g.wtime : g.btime))}
      </span>
    ));
    const right = isTop && config.rotation % 2 == 1 ? ' text-right' : '';
    const style = 'h-[31px] text-xl m-0 p-1';

    return (
      <p className={style + right}>
        {isWhite ? `White: ${g.white}` : `Black: ${g.black}`} &lt;
        {isWhite == g.isWhiteTurn ? (
          <Ticker timer={clock} />
        ) : (
          toMMSS(isWhite ? g.wtime : g.btime)
        )}{' '}
        &gt;
        {isWhite != g.isWhiteTurn && g.isComplete ? ' ** Winner **' : ''}
      </p>
    );
  }
);
