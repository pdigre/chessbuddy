import React, { useEffect, useRef, useState } from 'react';
import { useGlobalState, usePersistentState } from '../data/state';
import styles from '../styles.module.scss';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import type { HANDLE_CLICK } from './reacttypes';
import * as rules from '../data/rules';
import { MessageBoxProps } from './MessageBox';
import { game2string, log2arr } from '../data/library';

export type HistoryProps = {
  gotoMark: (mark: number) => void;
  setMessage: (value: React.SetStateAction<MessageBoxProps | undefined>) => void;
};

export const History: React.FC<HistoryProps> = ({ gotoMark, setMessage }) => {
  const endRef = useRef<HTMLElement>(null);
  const [history, setHistory] = useGlobalState('history');
  const [start, setStart] = useGlobalState('start');
  const [white, setWhite] = useGlobalState('white');
  const [black, setBlack] = useGlobalState('black');
  const [markHistory, setMarkHistory] = useGlobalState('markHistory');
  const [marker, setMarker] = useState(-1);
  const [log, setLog] = usePersistentState('log', '');
  const [showStats, setShowStats] = useGlobalState('showStats');
  const [fen, setFen] = useGlobalState('fen');

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [history]);

  if (rules.whoWon(history)) {
    const game = game2string(start, white, black, history);
    if (!log.split('\n').includes(game)) {
      setLog(log + game + '\n');
    }
  }

  if (!showStats && marker >= 0) {
    const games = log2arr(log);
    if (history.length == 0 || games.includes(game2string(start, white, black, history))) {
      const moves = games[marker].split(';')[3].split(' ');
      setMessage({
        title: 'Load game',
        msg: 'Do you want to look at this game?',
        buttons: ['Yes', 'No'],
        response: reply => {
          if (reply == 'Yes') {
            setHistory(moves);
            const mark = moves.length - 1;
            setMarkHistory(mark);
            setFen(rules.replay(moves, mark));
          }
          setMessage({});
        },
      });
    } else {
      setMessage({
        title: 'Load game',
        msg: 'You have to end current game to load previous games',
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
    const id2 = id == markHistory ? -1 : id;
    setMarkHistory(id2);
    gotoMark(id2);
  };

  const logClick: HANDLE_CLICK = event => {
    event.preventDefault();
    const id = Number.parseInt(
      ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).id
    );
    const id2 = id == marker ? -1 : id;
    setMarker(id2);
    //    gotoMark(id2);
  };

  const showGame = () => {
    const rows: string[][] = [];
    for (let i = 0; i < history.length / 2; i++) {
      rows[i] = ['', ''];
    }
    history.forEach((t, i) => {
      const l = Math.floor(i / 2),
        c = i % 2;
      rows[l][c] = t;
    });
    return rows.map((row, iRow) => (
      <TableRow key={iRow}>
        {row.map((col, iCol) => {
          const id = iRow * 2 + iCol;
          return (
            <TableCell id={id} key={id} className={id == markHistory ? styles.MarkCell : ''}>
              {col}
            </TableCell>
          );
        })}
      </TableRow>
    ));
  };

  const showLog = () => {
    const rows: string[][] = [];
    log2arr(log).forEach(game => {
      const cols = game.split(';');
      const moves = cols[3].split(' ');
      const win = rules.whoWon(moves)?.substring(0, 1) ?? '?';
      rows.push([cols[0], cols[1].split(' ')[0], cols[2].split(' ')[0], win]);
    });
    return rows.map((row, iRow) => (
      <TableRow key={iRow} id={iRow} className={iRow == marker ? styles.MarkRow : ''}>
        <TableCell>{row[0]}</TableCell>
        <TableCell>{row[1]}</TableCell>
        <TableCell>{row[2]}</TableCell>
        <TableCell>{row[3]}</TableCell>
      </TableRow>
    ));
  };

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
