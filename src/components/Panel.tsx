import React from 'react';
import { ButtonGroup } from '@material-ui/core';
import { PlayArrow, Pause, Settings, Timeline, EventNote, Input, Undo } from '@material-ui/icons';
import styles from '../styles.module.scss';
import { useGlobalState } from '../data/state';
import * as rules from '../data/rules';
import { Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import { GameState, game } from '../data/game';
import { messager } from './MessageBox';

export const Panel = observer(({ gameState }: { gameState: GameState }) => {
  const [showConfig, setShowConfig] = useGlobalState('showConfig');
  const [showHist, setShowHist] = useGlobalState('showHist');
  const [markHist, setMarkHist] = useGlobalState('markHist');
  const [markLog, setMarkLog] = useGlobalState('markLog');

  const isGotoHist = showHist && markHist >= 0;
  const isUndo = !showHist && markLog >= 0;
  const playHandler = () => {
    if (game.isComplete) game.reset();
    if (!gameState.isPlaying && markLog >= 0) {
      messager.display(
        'Undo',
        'Do you want to revert the game to the marked position?',
        ['Yes', 'No'],
        yes => {
          messager.clear();
          if (yes == 'Yes') {
            game.log = game.log.slice(0, markLog);
            game.fen = rules.replay(game.log);
          }
          setMarkLog(-1);
        }
      );
      return;
    }
    gameState.isPlaying = !gameState.isPlaying;
    gameState.run();
  };

  const histHandler = () => setShowHist(!showHist);

  const configHandler = () => {
    setShowConfig(true);
    gameState.isPlaying = false;
  };

  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      className={styles.Panel}>
      <Button className={styles.Button} onClick={playHandler} variant="contained">
        {isUndo ? <Undo /> : gameState.isPlaying ? <PlayArrow /> : <Pause />}
      </Button>
      <Button className={styles.Button} onClick={histHandler} variant="contained">
        {isGotoHist ? <Input /> : showHist ? <Timeline /> : <EventNote />}
      </Button>
      <Button className={styles.Button} onClick={configHandler} variant="contained">
        <Settings />
      </Button>
    </ButtonGroup>
  );
});
