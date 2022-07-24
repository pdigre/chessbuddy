import React from 'react';
import { Game } from '../logic/game';
import { locate, sanText } from '../logic/openings';
import { observer } from 'mobx-react';

export const FenInfo = observer(({ game }: { game: Game }) => {
  return <p>{sanText(locate(game.log))}</p>;
});
