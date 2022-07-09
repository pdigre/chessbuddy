import React, { ReactElement } from 'react';
import { Button } from '@material-tailwind/react';
import { EventNote, Input, Pause, PlayArrow, Settings, Timeline, Undo } from '@mui/icons-material';
import styles from '../styles.module.scss';
import * as rules from '../data/rules';
import { observer } from 'mobx-react';
import { game, GameState } from '../data/game';
import { refreshtimer } from '../data/refreshtimer';
import { Config } from '../data/config';
import { messageDialog } from './MessageBox';
import { helper } from '../data/helper';

export const Panel = observer(({ gameState, config }: { gameState: GameState; config: Config }) => {
  const isGotoHist = config.showHist && config.markHist >= 0;
  const playHandler = () => {
    if (game.isComplete) game.reset();
    const isHistUndo = !config.showHist && config.markLog >= 0;
    const isPlayUndo = gameState.isPlaying && config.showUndo;
    if (isHistUndo || isPlayUndo) {
      messageDialog.display(
        'Undo',
        isPlayUndo
          ? 'Do you want to undo last move?'
          : 'Do you want to revert the game to the marked position?',
        ['Yes', 'No'],
        yes => {
          messageDialog.clear();
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
        className="h-12 flex-grow bg-green-700 text-black rounded-lg"
        onClick={props.onClick}
        variant="filled">
        {props.children}
      </Button>
    );
  };

  return (
    <div className="flex gap-1 w-full">
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
    </div>
  );
});
