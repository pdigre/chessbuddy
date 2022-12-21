import React, { ReactElement } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { chessRulesService as rules } from '../../services/chessrules.service';
import { observer } from 'mobx-react';
import { playService, GameState } from '../../services/play.service';
import { refreshtimer } from '../../services/control/refreshtimer';
import { config } from '../../model/config';
import { analyzerService } from '../../services/analyzer.service';
import { messageService } from '../../services/message.service';
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
  MdEdit,
} from 'react-icons/md';
import { HistoryService } from '../../services/history.service';
import { runInAction } from 'mobx';

export const MainButtonBar = observer(
  ({ gameState, history: gameHistory }: { gameState: GameState; history: HistoryService }) => {
    const isGotoHist = gameState.showHist && gameHistory.markHist >= 0;
    const playHandler = () => {
      if (playService.isComplete) playService.reset();
      const isHistUndo = !gameState.showHist && gameState.markLog >= 0;
      const isPlayUndo = gameState.isPlaying && gameState.showUndo;
      if (isHistUndo || isPlayUndo) {
        messageService.display(
          'Undo',
          isPlayUndo
            ? 'Do you want to undo last move?'
            : 'Do you want to revert the game to the marked position?',
          [
            { label: 'Yes', icon: <MdCheck /> },
            { label: 'No', icon: <MdCancel /> },
          ],
          yes => {
            messageService.clear();
            if (yes == 'Yes') {
              playService.log = playService.log.slice(
                0,
                isPlayUndo ? gameState.undopos : gameState.markLog
              );
              playService.fen = rules.replay(playService.log);
              refreshtimer.startRefreshTimer();
              analyzerService.cp = 0;
              analyzerService.help = [];
            }
            runInAction(() => {
              gameState.markLog = -1;
            });
          }
        );
        return;
      }
      runInAction(() => {
        gameState.isPlaying = !gameState.isPlaying;
      });
      gameState.run();
    };

    const histHandler = () =>
      runInAction(() => {
        gameState.showHist = !gameState.showHist;
      });

    const configHandler = () => {
      runInAction(() => {
        config.showConfig = true;
        gameState.isPlaying = false;
      });
    };

    const isHistUndo = !gameState.showHist && gameState.markLog >= 0;
    const isPlayUndo = gameState.isPlaying && gameState.showUndo;

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
          ) : gameState.editMode ? (
            <MdEdit className="text-3xl" />
          ) : gameState.showHist ? (
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
  }
);
