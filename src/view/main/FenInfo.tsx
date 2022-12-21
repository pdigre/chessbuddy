import React from 'react';
import { PlayService } from '../../services/play.service';
import { openingsService } from '../../services/index.service';
import { observer } from 'mobx-react';

export const FenInfo = observer(({ game }: { game: PlayService }) => {
  return <p>{openingsService.sanTextLocate(game.log)}</p>;
});
