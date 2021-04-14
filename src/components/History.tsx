import React, { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../data/state';
import styles from '../styles.module.scss';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import type { HANDLE_CLICK } from './reacttypes';
import * as rules from '../data/rules';
import { messager } from './MessageBox';
import { GameHistory, Game, gameState } from '../data/game';
import { observer } from 'mobx-react';

export const History = observer(
  ({ game, gameHistory }: { game: Game; gameHistory: GameHistory }) => {
    const endRef = useRef<HTMLElement>(null);
    const [markLog, setMarkLog] = useGlobalState('markLog');
    const [marker, setMarker] = useState(-1);
    const [showHistory, setShowHistory] = useGlobalState('showStats');

    endRef.current?.scrollIntoView();

    if (!showHistory && marker >= 0) {
      const games = gameHistory.history;
      if (game.isComplete || game.log.length == 0) {
        const moves = games[marker].split(';')[5].split(' ');
        messager.display(
          'Load game',
          <div>Do you want to look at this game?</div>,
          ['Yes', 'No'],
          reply => {
            if (reply == 'Yes') {
              game.log = moves;
              const mark = moves.length - 1;
              setMarkLog(mark);
              game.fen = rules.replay(moves, mark);
            }
            messager.clear();
          }
        );
      } else {
        messager.display(
          'Load game',
          <div>You have to end current game to load previous games</div>,
          ['Ok']
        );
      }
      setMarker(-1);
    }

    const gotoMark = (mark: number) => {
      if (gameState.isPlaying) gameState.isPlaying = false;
      game.fen = rules.replay(game.log, mark >= 0 ? mark : game.log.length);
    };

    const logClick: HANDLE_CLICK = event => {
      event.preventDefault();
      const id = Number.parseInt((event.target as HTMLTableCellElement).id);
      const id2 = id == markLog ? -1 : id;
      setMarkLog(id2);
      gotoMark(id2);
    };

    const historyClick: HANDLE_CLICK = event => {
      event.preventDefault();
      const id = Number.parseInt(
        ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).id
      );
      const id2 = id == marker ? -1 : id;
      setMarker(id2);
    };

    function isTouchDevice() {
      try {
        document.createEvent('TouchEvent');
        return true;
      } catch (e) {
        return false;
      }
    }

    let scrollStartPos = 0;
    let scrollTop = 0;
    const touchstart = (event: TouchEvent) => {
      scrollStartPos = scrollTop + event.touches[0].pageY;
      //            event.preventDefault();
    };
    const touchmove = (event: TouchEvent) => {
      scrollTop = scrollStartPos - event.touches[0].pageY;
      //            event.preventDefault();
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
              <TableCell id={id} key={id} className={id == markLog ? styles.MarkCell : ''}>
                {col}
              </TableCell>
            );
          })}
        </TableRow>
      ));
    };

    const viewHistory = () =>
      gameHistory.history.map((row, iRow) => {
        const cols = row.split(';');
        const date = new Date(Number.parseInt(cols[0], 36));
        const t1 = date.getTime();
        const t2 = new Date().getTime();
        const tim =
          t2 - t1 < 3600 * 24000 && t1 < t2
            ? date.toTimeString().split(' ')[0]
            : date.toISOString().split('T')[0];
        const moves = cols[cols.length - 1].split(' ');
        const win = rules.whoWon(moves)?.substring(0, 1) ?? '?';
        return (
          <TableRow key={iRow} id={iRow} className={iRow == marker ? styles.MarkRow : ''}>
            <TableCell>{tim}</TableCell>
            <TableCell>{cols[1].split(' ')[0]}</TableCell>
            <TableCell>{cols[2].split(' ')[0]}</TableCell>
            <TableCell>{win}</TableCell>
          </TableRow>
        );
      });

    return (
      <TableContainer className={showHistory ? styles.Log : styles.History}>
        <Table size="small" ontouchstart={touchstart} ontouchmove={touchmove}>
          <TableBody onClick={showHistory ? historyClick : logClick}>
            {showHistory ? viewHistory() : viewLog()}
            <TableRow ref={endRef} />
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);
