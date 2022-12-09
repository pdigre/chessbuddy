import React from 'react';
import { PlayService } from '../../services/play.service';
import { toMMSS } from '../../resources/library';
import { Timer, timer } from '../../model/timer';
import { observer } from 'mobx-react';
import { Config } from '../../model/config';

export const PlayerInfoBar = observer(
  ({ isTop, game, config }: { isTop: boolean; game: PlayService; config: Config }) => {
    const sound_click = new Audio('/mp3/click.mp3');
    const sound_error = new Audio('/mp3/buzzer.mp3');
    const isWhite = isTop == config.rotation > 1;
    const otherTime = isWhite ? game.wtime : game.btime;
    const other = game.allowed ? game.allowed - otherTime : otherTime;
    const startTime = Math.floor(game.isWhiteTurn ? game.wtime : game.btime);

    const calculate: (timer: Timer) => number = timer => {
      const current = Math.floor(timer.elapsed) + startTime;
      if (!game.allowed) {
        return current;
      }
      const remains = game.allowed - current;
      if (remains < 11) {
        sound_click.play().then();
      }
      if (remains < 0) {
        sound_error.play().then();
        game.outOfTime();
      }
      return game.allowed - current;
    };

    const Ticker = observer(({ timer }: { timer: Timer }) => (
      <span>{toMMSS(calculate(timer))}</span>
    ));

    return (
      <p
        className={
          'h-[31px] text-xl dark:text-white m-0 p-1' +
          (isTop && config.rotation % 2 == 1 ? ' text-right' : '')
        }>
        {isWhite ? `White: ${config.white}` : `Black: ${config.black}`} &lt;
        {isWhite == game.isWhiteTurn ? <Ticker timer={timer} /> : toMMSS(other)} &gt;
        {isWhite != game.isWhiteTurn && game.isComplete ? ' ** Winner **' : ''}
      </p>
    );
  }
);
