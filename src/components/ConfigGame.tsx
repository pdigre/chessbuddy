import React from 'react';
import { useGlobalState } from '../data/state';
import { Player } from '../data/player';
import * as rules from '../data/rules';
import { ConfigSelector } from './ConfigSelector';
import styles from '../styles.module.scss';
import { Button } from '@material-ui/core';
import { Clear, PlayArrow, ExitToApp } from '@material-ui/icons';
import { MessageBoxProps } from './MessageBox';

export type ConfigGameProps = {
  newGame: () => void;
  stopstart: () => void;
  setMessage: (value: React.SetStateAction<MessageBoxProps | undefined>) => void;
  players: Player[];
};

export const ConfigGame: React.FC<ConfigGameProps> = ({
  newGame,
  stopstart,
  setMessage: setMessage,
  players,
}) => {
  const [whiteBot, setWhiteBot] = useGlobalState('white');
  const [blackBot, setBlackBot] = useGlobalState('black');
  const [showConfig, setShowConfig] = useGlobalState('showConfig');
  const [history, setHistory] = useGlobalState('history');

  const playerNames = Array.from(players.map(x => x.name));

  const playAction = () => {
    setShowConfig(false);
    stopstart();
  };

  const recordScore: (ok: string) => void = yes => {
    if (yes == 'White') {
      setHistory(history => [...history, '1-0']);
    } else if (yes == 'Black') {
      setHistory(history => [...history, '0-1']);
    } else if (yes == 'Draw') {
      setHistory(history => [...history, '1/2-1/2']);
    }
    setMessage({});
  };

  const endAction = () => {
    const winner = rules.whoWon(history);
    if (winner) {
      setMessage({
        title: 'Game has ended',
        msg: winner != 'Draw' ? winner + ' won this game' : 'The game was a draw',
        buttons: [],
        response: () => setMessage({}),
      });
    } else {
      setMessage({
        title: 'End game',
        msg: 'Who won?',
        buttons: ['White', 'Black', 'Draw'],
        response: recordScore,
      });
    }
  };

  return (
    <div className={styles.Config}>
      <ConfigSelector
        label="White"
        choices={playerNames}
        selected={whiteBot}
        setSelected={setWhiteBot}
      />
      <ConfigSelector
        label="Black"
        choices={playerNames}
        selected={blackBot}
        setSelected={setBlackBot}
      />
      <div className={styles.Buttons}>
        <Button className={styles.Button} onClick={playAction} aria-label="list" value="Play">
          Play
          <PlayArrow />
        </Button>
        <Button className={styles.Button} onClick={endAction} aria-label="list" value="End">
          End game
          <ExitToApp />
        </Button>
        <Button className={styles.Button} onClick={newGame} aria-label="list" value="Reset">
          Reset
          <Clear />
        </Button>
      </div>
    </div>
  );
};
