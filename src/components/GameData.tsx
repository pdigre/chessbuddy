import React, { MouseEvent } from 'react';
import * as rules from '../logic/rules';
import { Game, gameState } from '../logic/game';
import { observer } from 'mobx-react';
import { Config } from '../logic/config';
import { refreshtimer } from '../logic/refreshtimer';
import { helper } from '../logic/helper';
import { message } from '../logic/message';
import { GameHistory } from '../logic/history';
import { MdCancel, MdCheck } from 'react-icons/md';
import { TableWidget } from './TableWidget';

export const GameData = observer(
  ({ game, gameHistory, config }: { game: Game; gameHistory: GameHistory; config: Config }) => {
    if (config.markHist >= 0) {
      if (game.isComplete || game.log.length == 0) {
        const games = gameHistory.history;
        const moves = games[config.markHist].split(';')[5].split(' ');
        message.display(
          'Load game',
          'Do you want to look at this game?',
          [
            { label: 'Yes', icon: <MdCheck /> },
            { label: 'No', icon: <MdCancel /> },
          ],
          reply => {
            if (reply == 'Yes') {
              game.log = moves;
              const mark = moves.length - 1;
              config.markLog = mark;
              game.fen = rules.replay(moves, mark);
            }
            message.clear();
          }
        );
      } else {
        message.display('Load game', 'You have to end current game to load previous games', [
          { label: 'Ok' },
        ]);
      }
      config.markHist = -1;
    }

    const gotoMark = (mark: number) => {
      if (gameState.isPlaying) gameState.isPlaying = false;
      game.fen = rules.replay(game.log, mark >= 0 ? mark : game.log.length);
      refreshtimer.startRefreshTimer();
      helper.cp = 0;
      helper.help = [];
    };

    const logClick = (event: MouseEvent<HTMLTableElement>) => {
      event.preventDefault();
      const id = Number.parseInt((event.target as HTMLTableCellElement).id);
      const id2 = id == config.markLog ? -1 : id;
      config.markLog = id2;
      gotoMark(id2);
    };

    const rows: string[][] = [];
    const log = game.log;
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
          const marker = id == config.markLog ? ' bg-green-300' : '';
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
      <TableWidget onClick={logClick} scroll={config.markLog == -1}>
        {viewLog}
      </TableWidget>
    );
  }
);
