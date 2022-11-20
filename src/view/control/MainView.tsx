import React from 'react';
import { game } from '../../controller/game/game';
import { observer } from 'mobx-react';
import { Config } from '../../controller/config/config';
import { gameHistory } from '../../controller/game/history';
import { HistoryView } from './HistoryView';
import { GameView } from './GameView';
import { EditView } from './EditView';

export const MainView = observer(({ config }: { config: Config }) => {
  return config.editMode ? (
    <EditView config={config} />
  ) : config.showHist ? (
    <HistoryView gameHistory={gameHistory} config={config} />
  ) : (
    <GameView game={game} gameHistory={gameHistory} config={config} />
  );
});
