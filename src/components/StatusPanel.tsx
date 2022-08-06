import React from 'react';
import { game } from '../logic/game';
import { observer } from 'mobx-react';
import { Config } from '../logic/config';
import { gameHistory } from '../logic/history';
import { HistoryData } from './HistoryData';
import { GameData } from './GameData';

export const StatusPanel = observer(({ config }: { config: Config }) => {
  return config.showHist ? (
    <HistoryData gameHistory={gameHistory} config={config} />
  ) : (
    <GameData game={game} gameHistory={gameHistory} config={config} />
  );
});
