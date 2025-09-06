import { observer } from 'mobx-react';
import { AnalyzerService } from '../../common/service/analyzer.service';
import { ClockService } from '../../common/service/clock.service';
import { PlayService } from '../../common/service/play.service';
import { clockService, openingsService } from '../../common/service/index.service';
import React from 'react';
import { RenderingService } from '../../common/service/rendering.service';

export const CP = observer(
  ({ analyzer, rendering }: { analyzer: AnalyzerService; rendering: RenderingService }) => {
    if (!rendering.showCP) {
      return <div className="w-6 h-full flex flex-col flex-grow"></div>;
    }
    const { txt, blackTop, h1, h2 } = analyzer.getCpInfo();
    const coloring = (black: boolean) => (black ? 'bg-black text-white' : 'bg-white text-black');
    return (
      <div className="w-6 h-full flex flex-col flex-grow [&>div]:[writing-mode:vertical-lr] [&>div]:text-center">
        <div className={coloring(!blackTop)} style={{ height: h1 }}>
          {txt}
        </div>
        <div className={coloring(blackTop)} style={{ height: h2 }}>
          {txt}
        </div>
      </div>
    );
  }
);

export const FenInfo = observer(({ play }: { play: PlayService }) => {
  return <p>{openingsService.sanTextLocate(play.log)}</p>;
});

export const PlayerInfoBar = observer(({ isTop, play }: { isTop: boolean; play: PlayService }) => {
  const { other, label, showTicker, banner, isTextRight } = play.getPlayerInfo(isTop);
  return (
    <p className={'h-[31px] text-xl dark:text-white m-0 p-1' + (isTextRight ? ' text-right' : '')}>
      {label} &lt;
      {showTicker ? <Ticker clock={clockService} /> : other} &gt;
      {banner}
    </p>
  );
});

export const Ticker = observer(({ clock }: { clock: ClockService }) => (
  <span>{clock.clockText}</span>
));
