import React from 'react';
import { DashboardService } from '../../services/dashboard.service';
import { observer } from 'mobx-react';
import { historyService, playService } from '../../services/index.service';
import { HistoryView } from './HistoryView';
import { LogView } from './LogView';
import { EditView } from './EditView';

export const MainView = observer(({ gameState }: { gameState: DashboardService }) => {
  return gameState.showEdit ? (
    <EditView gameState={gameState} />
  ) : gameState.showHist ? (
    <HistoryView gameHistory={historyService} />
  ) : (
    <LogView game={playService} gameHistory={historyService} />
  );
});
