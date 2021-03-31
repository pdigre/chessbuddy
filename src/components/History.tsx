import React, { useEffect, useRef } from 'react';
import styles from '../styles.module.scss';
import { useGlobalState } from '../data/state';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import type { HANDLE_CLICK } from './reacttypes';

export const History: React.FC<{ gotoMark: (mark: number) => void }> = ({ gotoMark }) => {
  const endRef = useRef<HTMLElement>(null);
  const [history] = useGlobalState('history');
  const [markHistory, setMarkHistory] = useGlobalState('markHistory');

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [history]);

  const wb: string[][] = [];
  for (let i = 0; i < history.length / 2; i++) {
    wb[i] = ['', ''];
  }
  history.forEach((t, i) => {
    const l = Math.floor(i / 2),
      c = i % 2;
    wb[l][c] = t;
  });

  const handleClick: HANDLE_CLICK = event => {
    event.preventDefault();
    const id = Number.parseInt((event.target as HTMLTableCellElement).id);
    const id2 = id == markHistory ? -1 : id;
    setMarkHistory(id2);
    gotoMark(id2);
  };

  return (
    <TableContainer className={styles.History}>
      <Table size="small" className={styles.HistoryTable}>
        <TableBody onClick={handleClick}>
          {wb.map((line, iLine) => (
            <TableRow key={iLine}>
              {line.map((col, iCol) => {
                const id = iLine * 2 + iCol;
                return (
                  <TableCell
                    id={id}
                    key={id}
                    className={id == markHistory ? styles.MarkHistory : ''}>
                    {col}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          <TableRow ref={endRef} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
