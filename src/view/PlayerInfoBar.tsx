import React from 'react';
import { PlayService } from '../service/play.service';
import { toMMSS } from '../resources/library';
import { TimerService } from '../service/timer.service';
import { observer } from 'mobx-react';
import { ConfigService } from '../model/config';
import { timerService } from '../service/index.service';

export const PlayerInfoBar = observer(
  ({ isTop, play, config }: { isTop: boolean; play: PlayService; config: ConfigService }) => {
    const sound_click = new Audio('/mp3/click.mp3');
    const sound_error = new Audio('/mp3/buzzer.mp3');
    const isWhite = isTop == config.rotation > 1;
    const otherTime = isWhite ? play.wtime : play.btime;
    const other = play.allowed ? play.allowed - otherTime : otherTime;
    const startTime = Math.floor(play.isWhiteTurn ? play.wtime : play.btime);

    const calculate: (timer: TimerService) => number = timer => {
      const current = Math.floor(timer.elapsed) + startTime;
      if (!play.allowed) {
        return current;
      }
      const remains = play.allowed - current;
      if (remains < 11) {
        sound_click.play().then();
      }
      if (remains < 0) {
        sound_error.play().then();
        play.outOfTime();
      }
      return play.allowed - current;
    };

    const Ticker = observer(({ timer }: { timer: TimerService }) => (
      <span>{toMMSS(calculate(timer))}</span>
    ));

    return (
      <p
        className={
          'h-[31px] text-xl dark:text-white m-0 p-1' +
          (isTop && config.rotation % 2 == 1 ? ' text-right' : '')
        }>
        {isWhite ? `White: ${config.white}` : `Black: ${config.black}`} &lt;
        {isWhite == play.isWhiteTurn ? <Ticker timer={timerService} /> : toMMSS(other)} &gt;
        {isWhite != play.isWhiteTurn && play.isComplete ? ' ** Winner **' : ''}
      </p>
    );
  }
);
