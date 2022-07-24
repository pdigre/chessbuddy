import React, { MouseEvent, TouchEvent, useRef } from 'react';
import styles from '../styles.module.scss';
import * as rules from '../logic/rules';
import { messager } from './MessageBox';
import { GameHistory, Game, gameState } from '../logic/game';
import { observer } from 'mobx-react';
import { Config } from '../logic/config';
import { refreshtimer } from '../logic/refreshtimer';
import { helper } from '../logic/helper';

export const History = observer(
  ({ game, gameHistory, config }: { game: Game; gameHistory: GameHistory; config: Config }) => {
    const endRef = useRef<HTMLTableRowElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

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

    const historyClick = (event: MouseEvent<HTMLTableElement>) => {
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
    const onTouchStart = (event: TouchEvent<HTMLTableElement>) => {
      fingerStart = event.touches[0].pageY;
      scrollStart = scrollMove;
      event.preventDefault();
    };
    const onTouchMove = (event: TouchEvent<HTMLTableElement>) => {
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
        <tr key={iRow}>
          <td className={styles.NumberCell}>
            <span>{iRow}</span>
          </td>
          {row.map((col, iCol) => {
            const id = iRow * 2 + iCol;
            return (
              <td
                id={id.toString()}
                key={id.toString()}
                className={id == config.markLog ? styles.MarkCell : ''}>
                {col}
              </td>
            );
          })}
        </tr>
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
          return (
            <tr
              key={iRow.toString()}
              id={iRow.toString()}
              className={iRow == config.markHist ? styles.MarkRow : ''}>
              <td>{tim}</td>
              <td>{cols[1].split(' ')[0]}</td>
              <td>{cols[2].split(' ')[0]}</td>
              <td>{win}</td>
            </tr>
          );
        });
    const chooseClick = config.showHist ? historyClick : logClick;
    const chooseStyle = config.showHist ? styles.Log : styles.History;
    return (
      <div className={chooseStyle} ref={scrollRef}>
        <table onTouchStart={onTouchStart} onTouchMove={onTouchMove} onClick={chooseClick}>
          {config.showHist ? viewHistory() : viewLog()}
          <tr ref={endRef} />
        </table>
      </div>
    );
  }
);
