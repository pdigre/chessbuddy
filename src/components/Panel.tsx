import React, { ReactElement } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import * as rules from '../logic/rules';
import { observer } from 'mobx-react';
import { game, GameState } from '../logic/game';
import { refreshtimer } from '../logic/refreshtimer';
import { Config } from '../logic/config';
import { helper } from '../logic/helper';
import { message } from '../logic/message';
import {
  MdCancel,
  MdCheck,
  MdInput,
  MdOutlineFolderOpen,
  MdOutlineHistory,
  MdPause,
  MdPlayArrow,
  MdSettings,
  MdUndo,
} from 'react-icons/md';

export const Panel = observer(({ gameState, config }: { gameState: GameState; config: Config }) => {
  const isGotoHist = config.showHist && config.markHist >= 0;
  const playHandler = () => {
    if (game.isComplete) game.reset();
    const isHistUndo = !config.showHist && config.markLog >= 0;
    const isPlayUndo = gameState.isPlaying && config.showUndo;
    if (isHistUndo || isPlayUndo) {
      message.display(
        'Undo',
        isPlayUndo
          ? 'Do you want to undo last move?'
          : 'Do you want to revert the game to the marked position?',
        [
          { label: 'Yes', icon: <MdCheck /> },
          { label: 'No', icon: <MdCancel /> },
        ],
        yes => {
          message.clear();
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
    config.showTab = 0;
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
          <MdUndo className="text-3xl" />
        ) : gameState.isPlaying ? (
          <MdPlayArrow className="text-3xl" />
        ) : (
          <MdPause className="text-3xl" />
        )}
      </PanelButton>
      <PanelButton onClick={histHandler}>
        {isGotoHist ? (
          <MdInput className="text-3xl" />
        ) : config.showHist ? (
          <MdOutlineFolderOpen className="text-3xl" />
        ) : (
          <MdOutlineHistory className="text-3xl" />
        )}
      </PanelButton>
      <PanelButton onClick={configHandler}>
        <MdSettings className="text-3xl" />
      </PanelButton>
    </ButtonGroup>
  );
});
