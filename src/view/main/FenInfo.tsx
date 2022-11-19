import React from 'react';
import { Game } from '../../controller/game/game';
import { locate, sanText } from '../../controller/util/openings';
import { observer } from 'mobx-react';

export const FenInfo = observer(({ game }: { game: Game }) => {
  return <p>{sanText(locate(game.log))}</p>;
});
