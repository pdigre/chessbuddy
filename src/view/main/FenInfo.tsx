import React from 'react';
import { Game } from '../../services/game/game';
import { locate, sanText } from '../../services/util/openings';
import { observer } from 'mobx-react';

export const FenInfo = observer(({ game }: { game: Game }) => {
  return <p>{sanText(locate(game.log))}</p>;
});
