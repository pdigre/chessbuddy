import React from 'react';
import { Game } from '../data/game';
import { locate, sanText } from '../data/openings';
import { observer } from 'mobx-react';

export const FenInfo = observer(({ game }: { game: Game }) => {
  return <p>{sanText(locate(game.log))}</p>;
});
