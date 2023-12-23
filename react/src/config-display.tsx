import React from 'react';
import { ConfigService } from '../../common/service/config.service';
import { observer } from 'mobx-react';
import { MdRotateRight } from 'react-icons/md';
import { ConfigBoolean, ConfigButton } from './config-widgets';
import { renderingService } from '../../common/service/index.service';

export const ConfigDisplay = observer(({ config }: { config: ConfigService }) => {
  const item = config.display;
  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <ConfigBoolean item={renderingService} id="darkTheme" label="Use dark theme" />
      <ConfigBoolean item={item} id="showFacts" label="Show openings information" />
      <ConfigBoolean item={item} id="showHints" label="Training mode / Stockfish suggestions" />
      <ConfigBoolean item={item} id="showCP" label="Show CP - CentiPawns estimate" />
      <ConfigBoolean item={item} id="playCorrect" label="Play giphy for correct moves" />
      <ConfigBoolean item={item} id="playMistake" label="Play giphy for big mistake" />
      <ConfigBoolean item={item} id="playWinner" label="Play giphy when game ends" />
      <ConfigButton
        onClick={renderingService.rotateAction}
        label="Rotate chessboard"
        icon={<MdRotateRight />}
      />
    </div>
  );
});
