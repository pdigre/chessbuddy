import React from 'react';
import { PlayService } from '../../services/play.service';
import { toMMSS } from '../../resources/library';
import { Timer, clockList } from '../../model/timer';
import { observer } from 'mobx-react';
import { Config } from '../../model/config';

export const PlayerInfoBar = observer(
  ({ isTop, game, config }: { isTop: boolean; game: PlayService; config: Config }) => {
    const isWhite = isTop == config.rotation > 1;
    type TIMER = { clockList: Timer };
    const Ticker = observer(({ clockList }: TIMER) => (
      <span>
        {toMMSS(
          Math.floor(clockList.elapsed) + Math.floor(game.isWhiteTurn ? game.wtime : game.btime)
        )}
      </span>
    ));

    return (
      <p
        className={
          'h-[31px] text-xl dark:text-white m-0 p-1' +
          (isTop && config.rotation % 2 == 1 ? ' text-right' : '')
        }>
        {isWhite ? `White: ${config.white}` : `Black: ${config.black}`} &lt;
        {isWhite == game.isWhiteTurn ? (
          <Ticker clockList={clockList} />
        ) : (
          toMMSS(isWhite ? game.wtime : game.btime)
        )}{' '}
        &gt;
        {isWhite != game.isWhiteTurn && game.isComplete ? ' ** Winner **' : ''}
      </p>
    );
  }
);
