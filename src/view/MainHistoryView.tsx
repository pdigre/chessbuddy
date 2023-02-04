import React, { MouseEvent } from 'react';
import { rulesService as rules } from '../service/index.service';
import { observer } from 'mobx-react';
import { HistoryService } from '../service/history.service';
import { GridWidget as GridWidget } from './MainWidgets';

export const MainHistoryView = observer(({ history }: { history: HistoryService }) => {
  const historyClick = (event: MouseEvent<HTMLTableElement>) => {
    event.preventDefault();
    const id = Number.parseInt(
      ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).id
    );
    const id2 = id == history.markHist ? -1 : id;
    history.markHist = id2;
  };

  const tableRows = history.history
    .filter(x => x.split(';').length > 5)
    .map((row, iRow) => {
      const cols = row.split(';');
      let tim = '?';
      const date = new Date(Number.parseInt(cols[0], 36));
      const t1 = date.getTime();
      const t2 = Date.now();
      try {
        tim =
          t2 - t1 < 3600 * 24000 && t1 < t2
            ? date.toTimeString().split(' ')[0]
            : date.toISOString().split('T')[0];
      } catch (error) {
        console.log(error);
      }
      const moves = cols[cols.length - 1].split(' ');
      const win = rules.whoWon(moves)?.substring(0, 1) ?? '?';
      // {style + marker}
      const marker = iRow == history.markHist ? ' bg-green-300' : '';
      return (
        <tr
          key={iRow.toString()}
          id={iRow.toString()}
          className={'[&td]:p-[3px] [&td]:text-center [&td]:text-lg dark:text-white' + marker}>
          <td>{tim}</td>
          <td>{cols[1].split(' ')[0]}</td>
          <td>{cols[2].split(' ')[0]}</td>
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
