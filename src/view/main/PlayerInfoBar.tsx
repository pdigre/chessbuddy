import React from 'react';
import { Game } from '../../controller/game/game';
import { toMMSS } from '../../controller/util/library';
import { ClockList, clockList } from '../../controller/config/clocklist';
import { observer } from 'mobx-react';
import { Config } from '../../controller/config/config';

export const PlayerInfoBar = observer(
  ({ isTop, game, config }: { isTop: boolean; game: Game; config: Config }) => {
    const g = game;
    const isWhite = isTop == config.rotation > 1;
    type TIMER = { clockList: ClockList };
    const Ticker = observer(({ clockList }: TIMER) => (
      <span>
        {toMMSS(Math.floor(clockList.elapsed) + Math.floor(g.isWhiteTurn ? g.wtime : g.btime))}
      </span>
    ));

    return (
      <p
        className={
          'h-[31px] text-xl dark:text-white m-0 p-1' +
          (isTop && config.rotation % 2 == 1 ? ' text-right' : '')
        }>
        {isWhite ? `White: ${g.white}` : `Black: ${g.black}`} &lt;
        {isWhite == g.isWhiteTurn ? (
          <Ticker clockList={clockList} />
        ) : (
          toMMSS(isWhite ? g.wtime : g.btime)
        )}{' '}
        &gt;
        {isWhite != g.isWhiteTurn && g.isComplete ? ' ** Winner **' : ''}
      </p>
    );
  }
);