import React, { useState } from 'react';
import { useGlobalState } from '../data/state';
import * as rules from '../data/rules';
import { ConfigSelector } from './ConfigSelector';
import styles from '../styles.module.scss';
import { Button } from '@material-ui/core';
import { Clear, PlayArrow, ExitToApp } from '@material-ui/icons';
import { messager } from './MessageBox';
import { game, gameState } from '../data/game';
import { observer } from 'mobx-react';
import { Players } from '../data/players';

export const ConfigGame = observer(({ players }: { players: Players }) => {
  const [white, setWhite] = useState(game.white);
  const [black, setBlack] = useState(game.black);
  const [showConfig, setShowConfig] = useGlobalState('showConfig');
  const playerNames = Array.from(players.players.map(x => x.name));
  game.setPlayers(white, black);

  const resetGame = () => {
    game.reset();
  };

  const playAction = () => {
    setShowConfig(false);
    gameState.isPlaying = true;
    gameState.run();
  };

  const recordScore: (ok: string) => void = yes => {
    if (yes == 'White') {
      game.playMove('1-0');
    } else if (yes == 'Black') {
      game.playMove('0-1');
    } else if (yes == 'Draw') {
      game.playMove('1/2-1/2');
    }
    messager.clear();
  };

  const endAction = () => {
    const winner = rules.whoWon(game.log);
    if (winner) {
      messager.display(
        'Game has ended',
        <div>{winner != 'Draw' ? winner + ' won this game' : 'The game was a draw'}</div>
      );
    } else {
      messager.display('End game', <div>Who won?</div>, ['White', 'Black', 'Draw'], recordScore);
    }
  };

  return (
    <div className={styles.Config}>
      <ConfigSelector label="White" choices={playerNames} selected={white} setSelected={setWhite} />
      <ConfigSelector label="Black" choices={playerNames} selected={black} setSelected={setBlack} />
      <div className={styles.Buttons}>
        <Button className={styles.Button} onClick={playAction} variant="contained">
          Play
          <PlayArrow />
        </Button>
        <Button className={styles.Button} onClick={endAction} variant="contained">
          End game
          <ExitToApp />
        </Button>
        <Button className={styles.Button} onClick={resetGame} variant="contained">
          Reset
          <Clear />
        </Button>
      </div>
    </div>
  );
});
