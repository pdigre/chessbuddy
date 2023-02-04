import React, { MouseEvent } from 'react';

import { PlayService } from '../service/play.service';
import { observer } from 'mobx-react';
import { messageService, dashboardService } from '../service/index.service';
import { HistoryService } from '../service/history.service';
import { GridWidget } from './MainWidgets';
import { YESNO_BUTTONS } from './MessageDialog';

export const MainLogView = observer(
  ({ play: playService, history: gameHistory }: { play: PlayService; history: HistoryService }) => {
    if (gameHistory.markHist >= 0) {
      if (playService.isComplete || playService.log.length == 0) {
        messageService.display(
          'Load game',
          'Do you want to look at this game?',
          YESNO_BUTTONS,
          reply => {
            if (reply == 'Yes') {
              playService.loadGame();
            }
            messageService.clear();
          }
        );
      } else {
        messageService.display('Load game', 'You have to end current game to load previous games', [
          { label: 'Ok' },
        ]);
      }
      gameHistory.setMarkHist(-1);
    }

    const logClick = (event: MouseEvent<HTMLTableElement>) => {
      event.preventDefault();
      const id = Number.parseInt((event.target as HTMLTableCellElement).id);
      playService.undoTo(id == dashboardService.markLog ? -1 : id);
    };

    const rows: string[][] = [];
    const log = playService.log;
    for (let i = 0; i < log.length / 2; i++) {
      rows[i] = ['', ''];
    }
    log.forEach((t, i) => {
      const l = Math.floor(i / 2),
        c = i % 2;
      rows[l][c] = t;
    });

    const viewLog = rows.map((row, iRow) => (
      <tr key={iRow} className="[&td]:p-[2px] [&td]:text-left [&td]:text-lg dark:text-white">
        <td className="w-5">
          <span className="text-red-900 text-sm dark:text-red-200">{iRow}</span>
        </td>
        {row.map((col, iCol) => {
          const id = iRow * 2 + iCol;
          const marker = id == dashboardService.markLog ? ' bg-green-300' : '';
          return (
            <td
              id={id.toString()}
              key={id.toString()}
              className={'w-30 p-[2px] text-center text-lg dark:text-white' + marker}>
              {col}
            </td>
          );
        })}
      </tr>
    ));

    return (
      <GridWidget onClick={logClick} scroll={dashboardService.markLog == -1}>
        {viewLog}
      </GridWidget>
    );
  }
);
