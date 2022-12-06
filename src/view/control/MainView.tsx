import React from 'react';
import { game } from '../../services/game/game';
import { observer } from 'mobx-react';
import { Config } from '../../model/config';
import { historyService } from '../../services/history.service';
import { HistoryView } from './HistoryView';
import { GameView } from './GameView';
import { EditView } from './EditView';

export const MainView = observer(({ config }: { config: Config }) => {
  return config.editMode ? (
    <EditView config={config} />
  ) : config.showHist ? (
    <HistoryView gameHistory={historyService} config={config} />
  ) : (
    <GameView game={game} gameHistory={historyService} config={config} />
  );
});
