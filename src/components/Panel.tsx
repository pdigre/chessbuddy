import React from 'react';
import { ButtonGroup } from '@material-ui/core';
import { PlayArrow, Pause, Settings, Timeline, EventNote } from '@material-ui/icons';
import styles from '../styles.module.scss';
import { useGlobalState } from '../data/state';
import * as rules from '../data/rules';
import { Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import { GameState, game } from '../data/game';
import { MessageType } from './MessageBox';

type PanelType = {
  gameState: GameState;
  setMessage: MessageType;
};

export const Panel = observer(({ gameState, setMessage }: PanelType) => {
  const [showConfig, setShowConfig] = useGlobalState('showConfig');
  const [showStats, setShowStats] = useGlobalState('showStats');
  const [markLog, setMarkLog] = useGlobalState('markLog');

  const playHandler = () => {
    if (game.isComplete) game.reset();
    if (!gameState.isPlaying && markLog >= 0) {
      setMessage({
        title: 'Undo',
        msg: <div>Do you want to revert the game to the marked position?</div>,
        buttons: ['Yes', 'No'],
        response: yes => {
          setMessage({});
          if (yes == 'Yes') {
            game.log = game.log.slice(0, markLog);
            game.fen = rules.replay(game.log);
          }
          setMarkLog(-1);
        },
      });
      return;
    }
    gameState.isPlaying = !gameState.isPlaying;
    gameState.run();
  };

  const statsHandler = () => setShowStats(!showStats);

  const configHandler = () => {
    setShowConfig(true);
    if (gameState.isPlaying) gameState.isPlaying = false;
  };

  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      className={styles.Panel}>
      <Button className={styles.Button} onClick={playHandler} variant="contained">
        {gameState.isPlaying ? <PlayArrow /> : <Pause />}
      </Button>
      <Button className={styles.Button} onClick={statsHandler} variant="contained">
        {showStats ? <Timeline /> : <EventNote />}
      </Button>
      <Button className={styles.Button} onClick={configHandler} variant="contained">
        <Settings />
      </Button>
    </ButtonGroup>
  );
});
