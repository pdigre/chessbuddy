import React from 'react';
import { ButtonGroup } from '@material-ui/core';
import { PlayArrow, Pause, Settings, Timeline, EventNote, Input, Undo } from '@material-ui/icons';
import styles from '../styles.module.scss';
import * as rules from '../data/rules';
import { Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import { GameState, game } from '../data/game';
import { Config } from '../data/config';
import { messager } from './MessageBox';

export const Panel = observer(({ gameState, flow }: { gameState: GameState; flow: Config }) => {
  const isGotoHist = flow.showHist && flow.markHist >= 0;
  const isUndo = !flow.showHist && flow.markLog >= 0;
  const playHandler = () => {
    if (game.isComplete) game.reset();
    if (!gameState.isPlaying && flow.markLog >= 0) {
      messager.display(
        'Undo',
        'Do you want to revert the game to the marked position?',
        ['Yes', 'No'],
        yes => {
          messager.clear();
          if (yes == 'Yes') {
            game.log = game.log.slice(0, flow.markLog);
            game.fen = rules.replay(game.log);
          }
          flow.markLog = -1;
        }
      );
      return;
    }
    gameState.isPlaying = !gameState.isPlaying;
    gameState.run();
  };

  const histHandler = () => (flow.showHist = !flow.showHist);

  const configHandler = () => {
    flow.showConfig = true;
    gameState.isPlaying = false;
  };

  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      className={styles.Panel}>
      <Button className={styles.Button} onClick={playHandler} variant="contained">
        {isUndo ? (
          <Undo fontSize="large" />
        ) : gameState.isPlaying ? (
          <PlayArrow fontSize="large" />
        ) : (
          <Pause fontSize="large" />
        )}
      </Button>
      <Button className={styles.Button} onClick={histHandler} variant="contained">
        {isGotoHist ? (
          <Input fontSize="large" />
        ) : flow.showHist ? (
          <Timeline fontSize="large" />
        ) : (
          <EventNote fontSize="large" />
        )}
      </Button>
      <Button className={styles.Button} onClick={configHandler} variant="contained">
        <Settings fontSize="large" />
      </Button>
    </ButtonGroup>
  );
});
