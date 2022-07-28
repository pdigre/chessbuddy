import React from 'react';
import { observer } from 'mobx-react';
import { Helper } from '../logic/helper';
import { Rendering } from '../logic/rendering';
import { Config } from '../logic/config';
import { mistake } from './Emotion';

let prevcp = 0;

export const CP = observer(
  ({ helper, rendering, config }: { helper: Helper; rendering: Rendering; config: Config }) => {
    if (!config.showCP) {
      return <div className="w-6 h-full flex flex-col flex-grow"></div>;
    }
    const cp = helper.cp;
    if (Math.abs(cp - prevcp) > 100) mistake();
    prevcp = cp;
    const blackTop = config.rotation > 1;
    const cp2 = isNaN(cp) ? 10000 : Math.abs(cp);
    const whiteLead = cp > 0;
    const txt = `cp ${cp2} ${whiteLead ? 'white' : 'black'}`;
    const h = rendering.height - 150;
    const x = Math.min(h, cp2);
    const s = (h - x) / 2 + 75;
    const isW = whiteLead != blackTop;
    const h1 = (isW ? 0 : x) + s + 'px';
    const h2 = (isW ? x : 0) + s + 'px';
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
