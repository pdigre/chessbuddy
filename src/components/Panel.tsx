import React, { ReactElement } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { EventNote, Input, Pause, PlayArrow, Settings, Timeline, Undo } from '@mui/icons-material';
import * as rules from '../logic/rules';
import { observer } from 'mobx-react';
import { game, GameState } from '../logic/game';
import { refreshtimer } from '../logic/refreshtimer';
import { Config } from '../logic/config';
import { messager } from './MessageBox';
import { helper } from '../logic/helper';

export const Panel = observer(({ gameState, config }: { gameState: GameState; config: Config }) => {
  const isGotoHist = config.showHist && config.markHist >= 0;
  const playHandler = () => {
    if (game.isComplete) game.reset();
    const isHistUndo = !config.showHist && config.markLog >= 0;
    const isPlayUndo = gameState.isPlaying && config.showUndo;
    if (isHistUndo || isPlayUndo) {
      messager.display(
        'Undo',
        isPlayUndo
          ? 'Do you want to undo last move?'
          : 'Do you want to revert the game to the marked position?',
        ['Yes', 'No'],
        yes => {
          messager.clear();
          if (yes == 'Yes') {
            game.log = game.log.slice(0, isPlayUndo ? config.undopos : config.markLog);
            game.fen = rules.replay(game.log);
            refreshtimer.startRefreshTimer();
            helper.cp = 0;
            helper.help = [];
          }
          config.markLog = -1;
        }
      );
      return;
    }
    gameState.isPlaying = !gameState.isPlaying;
    gameState.run();
  };

  const histHandler = () => (config.showHist = !config.showHist);

  const configHandler = () => {
    config.showConfig = true;
    gameState.isPlaying = false;
  };

  const isHistUndo = !config.showHist && config.markLog >= 0;
  const isPlayUndo = gameState.isPlaying && config.showUndo;

  const PanelButton = (props: { children: ReactElement; onClick: () => void }) => {
    return (
      <Button
        className="h-14 flex-grow bg-green-700"
        sx={{ backgroundColor: 'darkgreen' }}
        onClick={props.onClick}
        variant="contained">
        {props.children}
      </Button>
    );
  };

  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group" className="w-full">
      <PanelButton onClick={playHandler}>
        {isHistUndo || isPlayUndo ? (
          <Undo fontSize="large" />
        ) : gameState.isPlaying ? (
          <PlayArrow fontSize="large" />
        ) : (
          <Pause fontSize="large" />
        )}
      </PanelButton>
      <PanelButton onClick={histHandler}>
        {isGotoHist ? (
          <Input fontSize="large" />
        ) : config.showHist ? (
          <Timeline fontSize="large" />
        ) : (
          <EventNote fontSize="large" />
        )}
      </PanelButton>
      <PanelButton onClick={configHandler}>
        <Settings fontSize="large" />
      </PanelButton>
    </ButtonGroup>
  );
});
