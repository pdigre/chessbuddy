import React from 'react';
import { GameState, playService } from '../../services/play.service';
import { observer } from 'mobx-react';
import { Config } from '../../model/config';
import { historyService } from '../../services/history.service';
import { HistoryView } from './HistoryView';
import { LogView } from './LogView';
import { EditView } from './EditView';

export const MainView = observer(({ gameState: gameState }: { gameState: GameState }) => {
  return gameState.editMode ? (
    <EditView gameState={gameState} />
  ) : gameState.showHist ? (
    <HistoryView gameHistory={historyService} />
  ) : (
    <LogView game={playService} gameHistory={historyService} />
  );
});
