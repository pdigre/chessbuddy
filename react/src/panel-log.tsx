import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { dashboardService } from '../../common/service/index.service';
import { HistoryService } from '../../common/service/history.service';
import { PlayService } from '../../common/service/play.service';
import { GridWidget } from './main-widgets';
import { action } from 'mobx';

export const PanelLog = observer(
  ({ play, history }: { play: PlayService; history: HistoryService }) => {
    history.enterLogCheck();

    const logClickAction = action((event: MouseEvent<HTMLTableElement>) => {
      event.preventDefault();
      const id = Number.parseInt((event.target as HTMLTableCellElement).id);
      play.undoTo(id == dashboardService.markLog ? -1 : id);
    });

    const viewLog = history.getLogRows().map((row, iRow) => (
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
              className={'w-30 p-[2px] text-center text-lg dark:text-white' + marker}
            >
              {col}
            </td>
          );
        })}
      </tr>
    ));

    return (
      <GridWidget onClickAction={logClickAction} scroll={dashboardService.markLog == -1}>
        {viewLog}
      </GridWidget>
    );
  }
);
