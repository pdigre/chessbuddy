import React, { ReactElement } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { observer } from 'mobx-react';
import { playService, messageService, configService } from '../../services/index.service';
import { DashboardService } from '../../services/dashboard.service';
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

export const MainButtonBar = observer(
  ({
    gameState,
    history: gameHistory,
  }: {
    gameState: DashboardService;
    history: HistoryService;
  }) => {
    const isGotoHist = gameState.showHist && gameHistory.markHist >= 0;
    const isHistUndo = !gameState.showHist && gameState.markLog >= 0;
    const isPlayUndo = playService.isPlaying && gameState.showUndo;

    const playHandler = () => {
      if (playService.isComplete) playService.reset();
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
              playService.initGame(
                playService.log.slice(0, isPlayUndo ? gameState.undopos : gameState.markLog)
              );
            }
            gameState.setMarkLog(-1);
          }
        );
        return;
      }
      playService.setPlaying(!playService.isPlaying);
    };

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
          ) : playService.isPlaying ? (
            <MdPlayArrow className="text-3xl" />
          ) : (
            <MdPause className="text-3xl" />
          )}
        </PanelButton>
        <PanelButton onClick={() => gameState.toggleHistory()}>
          {isGotoHist ? (
            <MdInput className="text-3xl" />
          ) : gameState.showEdit ? (
            <MdEdit className="text-3xl" />
          ) : gameState.showHist ? (
            <MdOutlineFolderOpen className="text-3xl" />
          ) : (
            <MdOutlineHistory className="text-3xl" />
          )}
        </PanelButton>
        <PanelButton onClick={() => configService.openConfig()}>
          <MdSettings className="text-3xl" />
        </PanelButton>
      </ButtonGroup>
    );
  }
);
