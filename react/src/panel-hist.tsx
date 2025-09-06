import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { HistoryService } from '../../common/service/history.service';
import { GridWidget } from './main-widgets';
import { action } from 'mobx';

export const PanelHist = observer(({ history }: { history: HistoryService }) => {
  const historyClick = action((event: MouseEvent<HTMLTableElement>) => {
    event.preventDefault();
    const id = Number.parseInt(
      ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).id
    );
    history.setMarkHist(id === history.markHist ? -1 : id);
  });

  const tableRows = history.getGames().map((row, iRow) => {
    const { time, win, c1, c2 } = row;
    const marker = iRow === history.markHist ? ' bg-green-300' : '';
    return (
      <tr
        key={iRow.toString()}
        id={iRow.toString()}
        className={'[&td]:p-[3px] [&td]:text-center [&td]:text-lg dark:text-white' + marker}
      >
        <td>{time}</td>
        <td>{c1}</td>
        <td>{c2}</td>
        <td>{win}</td>
      </tr>
    );
  });

  return (
    <GridWidget onClickAction={historyClick} scroll={history.markHist === -1}>
      {tableRows}
    </GridWidget>
  );
});
