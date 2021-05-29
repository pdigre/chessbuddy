import React, { useRef } from 'react';
import styles from '../styles.module.scss';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import type { HANDLE_CLICK, HANDLE_TOUCH } from './reacttypes';
import * as rules from '../data/rules';
import { messager } from './MessageBox';
import { GameHistory, Game, gameState } from '../data/game';
import { observer } from 'mobx-react';
import { Config } from '../data/config';
import { undorefresh } from '../data/undorefresh';
import { helper } from '../data/helper';

export const History = observer(
  ({ game, gameHistory, config }: { game: Game; gameHistory: GameHistory; config: Config }) => {
    const endRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLElement>(null);

    if (config.showHist) {
      if (config.markHist == -1) endRef.current?.scrollIntoView();
    } else {
      if (config.markLog == -1) endRef.current?.scrollIntoView();
    }

    if (!config.showHist && config.markHist >= 0) {
      if (game.isComplete || game.log.length == 0) {
        const games = gameHistory.history;
        const moves = games[config.markHist].split(';')[5].split(' ');
        messager.display('Load game', 'Do you want to look at this game?', ['Yes', 'No'], reply => {
          if (reply == 'Yes') {
            game.log = moves;
            const mark = moves.length - 1;
            config.markLog = mark;
            game.fen = rules.replay(moves, mark);
          }
          messager.clear();
        });
      } else {
        messager.display('Load game', 'You have to end current game to load previous games', [
          'Ok',
        ]);
      }
      config.markHist = -1;
    }

    const gotoMark = (mark: number) => {
      if (gameState.isPlaying) gameState.isPlaying = false;
      game.fen = rules.replay(game.log, mark >= 0 ? mark : game.log.length);
      undorefresh.startRefreshTimer();
      helper.cp = 0;
      helper.help = [];
    };

    const logClick: HANDLE_CLICK = event => {
      event.preventDefault();
      const id = Number.parseInt((event.target as HTMLTableCellElement).id);
      const id2 = id == config.markLog ? -1 : id;
      config.markLog = id2;
      gotoMark(id2);
    };

    const historyClick: HANDLE_CLICK = event => {
      event.preventDefault();
      const id = Number.parseInt(
        ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).id
      );
      const id2 = id == config.markHist ? -1 : id;
      config.markHist = id2;
    };

    let fingerStart = 0;
    let scrollStart = 0;
    let scrollMove = 0;
    const onTouchStart: HANDLE_TOUCH = event => {
      fingerStart = event.touches[0].pageY;
      scrollStart = scrollMove;
      event.preventDefault();
    };
    const onTouchMove = (event: TouchEvent) => {
      const fingerMove = fingerStart - event.touches[0].pageY;
      scrollMove = scrollStart + fingerMove;
      scrollRef.current?.scroll({ top: scrollMove });
      event.preventDefault();
    };

    const viewLog = () => {
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
      return rows.map((row, iRow) => (
        <TableRow key={iRow}>
          <TableCell size="small" className={styles.NumberCell}>
            <span>{iRow}</span>
          </TableCell>
          {row.map((col, iCol) => {
            const id = iRow * 2 + iCol;
            return (
              <TableCell id={id} key={id} className={id == config.markLog ? styles.MarkCell : ''}>
                {col}
              </TableCell>
            );
          })}
        </TableRow>
      ));
    };

    const viewHistory = () =>
      gameHistory.history
        .filter(x => x.split(';').length > 5)
        .map((row, iRow) => {
          const cols = row.split(';');
          let tim = '?';
          const date = new Date(Number.parseInt(cols[0], 36));
          const t1 = date.getTime();
          const t2 = new Date().getTime();
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
          return (
            <TableRow
              key={iRow}
              id={iRow}
              className={iRow == config.markHist ? styles.MarkRow : ''}>
              <TableCell>{tim}</TableCell>
              <TableCell>{cols[1].split(' ')[0]}</TableCell>
              <TableCell>{cols[2].split(' ')[0]}</TableCell>
              <TableCell>{win}</TableCell>
            </TableRow>
          );
        });

    return (
      <TableContainer className={config.showHist ? styles.Log : styles.History} ref={scrollRef}>
        <Table size="small">
          <TableBody
            onClick={config.showHist ? historyClick : logClick}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}>
            {config.showHist ? viewHistory() : viewLog()}
            <TableRow ref={endRef} />
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);
