import React from 'react';
import { Game } from '../../services/game/game';
import { openingsService } from '../../services/openings.service';
import { observer } from 'mobx-react';

export const FenInfo = observer(({ game }: { game: Game }) => {
  return <p>{openingsService.sanTextLocate(game.log)}</p>;
});
