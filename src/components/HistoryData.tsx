import React, { MouseEvent } from 'react';
import * as rules from '../logic/rules';
import { observer } from 'mobx-react';
import { Config } from '../logic/config';
import { GameHistory } from '../logic/history';
import { TableWidget } from './TableWidget';

export const HistoryData = observer(
  ({ gameHistory, config }: { gameHistory: GameHistory; config: Config }) => {
    const historyClick = (event: MouseEvent<HTMLTableElement>) => {
      event.preventDefault();
      const id = Number.parseInt(
        ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).id
      );
      const id2 = id == config.markHist ? -1 : id;
      config.markHist = id2;
    };

    const tableRows = gameHistory.history
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
        const marker = iRow == config.markHist ? ' bg-green-300' : '';
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
      <TableWidget onClick={historyClick} scroll={config.markHist == -1}>
        {tableRows}
      </TableWidget>
    );
  }
);
