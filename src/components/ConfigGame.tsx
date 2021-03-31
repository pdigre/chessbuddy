import React from 'react';
import { ConfigSelector } from './ConfigSelector';
import styles from '../styles.module.scss';
import { useGlobalState } from '../data/state';
import { Player } from '../data/player';
import { Button } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { PlayArrow } from '@material-ui/icons';

export type ConfigGameProps = {
  newGame: () => void;
  stopstart: () => void;
  players: Player[];
};

export const ConfigGame: React.FC<ConfigGameProps> = ({ newGame, stopstart, players }) => {
  const [whiteBot, setWhiteBot] = useGlobalState('white');
  const [blackBot, setBlackBot] = useGlobalState('black');
  const [showConfig, setShowConfig] = useGlobalState('showConfig');

  const playerNames = Array.from(players.map(x => x.name));

  const playAction = () => {
    setShowConfig(false);
    stopstart();
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
        <Button className={styles.Button} onClick={newGame} aria-label="list" value="Reset">
          Reset
          <Clear />
        </Button>
      </div>
    </div>
  );
};
