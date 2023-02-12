import React, { MouseEvent } from 'react';
import { DashboardService } from '../service/dashboard.service';
import { observer } from 'mobx-react';
import { dashboardService, historyService, playService } from '../service/index.service';
import { MainEditView } from './MainEditView';
import { HistoryService } from '../service/history.service';
import { GridWidget } from './MainWidgets';
import { PlayService } from '../service/play.service';
import { EditService } from '../service/edit.service';

export const MainView = observer(
  ({ dashboard, edit }: { dashboard: DashboardService; edit: EditService }) => {
    return edit.showEdit ? (
      <MainEditView edit={edit} />
    ) : dashboard.showHist ? (
      <MainHistoryView history={historyService} />
    ) : (
      <MainLogView play={playService} history={historyService} />
    );
  }
);

export const MainHistoryView = observer(({ history }: { history: HistoryService }) => {
  const historyClick = (event: MouseEvent<HTMLTableElement>) => {
    event.preventDefault();
    const id = Number.parseInt(
      ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).id
    );
    history.setMarkHist(id == history.markHist ? -1 : id);
  };

  const tableRows = history.getGames().map((row, iRow) => {
    const { time, win, c1, c2 } = row;
    const marker = iRow == history.markHist ? ' bg-green-300' : '';
    return (
      <tr
        key={iRow.toString()}
        id={iRow.toString()}
        className={'[&td]:p-[3px] [&td]:text-center [&td]:text-lg dark:text-white' + marker}>
        <td>{time}</td>
        <td>{c1}</td>
        <td>{c2}</td>
        <td>{win}</td>
      </tr>
    );
  });

  return (
    <GridWidget onClick={historyClick} scroll={history.markHist == -1}>
      {tableRows}
    </GridWidget>
  );
});

export const MainLogView = observer(
  ({ play, history }: { play: PlayService; history: HistoryService }) => {
    history.enterLogCheck();

    const logClick = (event: MouseEvent<HTMLTableElement>) => {
      event.preventDefault();
      const id = Number.parseInt((event.target as HTMLTableCellElement).id);
      play.undoTo(id == dashboardService.markLog ? -1 : id);
    };

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
