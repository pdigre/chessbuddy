import React, { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../data/state';
import styles from '../styles.module.scss';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import type { HANDLE_CLICK } from './reacttypes';
import * as rules from '../data/rules';
import { MessageBoxProps } from './MessageBox';
import { gamerunner } from '../data/game';

type HistoryProps = {
  gotoMark: (mark: number) => void;
  setMessage: (value: React.SetStateAction<MessageBoxProps | undefined>) => void;
};

export const History: React.FC<HistoryProps> = ({ gotoMark, setMessage }) => {
  const endRef = useRef<HTMLElement>(null);
  const [log, setLog] = useGlobalState('log');
  const [markLog, setMarkLog] = useGlobalState('markLog');
  const [marker, setMarker] = useState(-1);
  const [showStats, setShowStats] = useGlobalState('showStats');
  const [fen, setFen] = useGlobalState('fen');

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [log]);

  if (!showStats && marker >= 0) {
    const games = gamerunner.getHistory();
    if (gamerunner.getGame().isComplete) {
      const moves = games[marker].split(';')[3].split(' ');
      setMessage({
        title: 'Load game',
        msg: <div>Do you want to look at this game?</div>,
        buttons: ['Yes', 'No'],
        response: reply => {
          if (reply == 'Yes') {
            setLog(moves);
            const mark = moves.length - 1;
            setMarkLog(mark);
            setFen(rules.replay(moves, mark));
          }
          setMessage({});
        },
      });
    } else {
      setMessage({
        title: 'Load game',
        msg: <div>You have to end current game to load previous games</div>,
        buttons: ['Ok'],
        response: () => {
          setMessage({});
        },
      });
    }
    setMarker(-1);
  }

  const historyClick: HANDLE_CLICK = event => {
    event.preventDefault();
    const id = Number.parseInt((event.target as HTMLTableCellElement).id);
    const id2 = id == markLog ? -1 : id;
    setMarkLog(id2);
    gotoMark(id2);
  };

  const logClick: HANDLE_CLICK = event => {
    event.preventDefault();
    const id = Number.parseInt(
      ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).id
    );
    const id2 = id == marker ? -1 : id;
    setMarker(id2);
  };

  const showGame = () => {
    const rows: string[][] = [];
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

  const showLog = () =>
    gamerunner.getHistory().map((row, iRow) => {
      const cols = row.split(';');
      const date = new Date(Number.parseInt(cols[0], 36));
      const tim =
        date.getDate() == new Date().getDate()
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
    <TableContainer className={styles.History}>
      <Table size="small" className={styles.HistoryTable}>
        <TableBody onClick={showStats ? logClick : historyClick}>
          {showStats ? showLog() : showGame()}
          <TableRow ref={endRef} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
