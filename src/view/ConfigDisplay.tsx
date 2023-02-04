import React from 'react';
import { ConfigService } from '../model/config';
import { observer } from 'mobx-react';
import { ConfigBoolean, ConfigButton } from './ConfigWidgets';
import { RenderingService } from '../service/rendering.service';
import { MdRotateRight } from 'react-icons/md';
import { runInAction } from 'mobx';

export const ConfigDisplay = observer(
  ({ config, rendering }: { config: ConfigService; rendering: RenderingService }) => {
    return (
      <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
        <ConfigBoolean config={config} id="darkTheme" label="Use dark theme" />
        <ConfigBoolean config={config} id="showFacts" label="Show openings information" />
        <ConfigBoolean
          config={config}
          id="showHints"
          label="Training mode / Stockfish suggestions"
        />
        <ConfigBoolean config={config} id="showCP" label="Show CP - CentiPawns estimate" />
        <ConfigBoolean config={config} id="playCorrect" label="Play giphy for correct moves" />
        <ConfigBoolean config={config} id="playMistake" label="Play giphy for big mistake" />
        <ConfigBoolean config={config} id="playWinner" label="Play giphy when game ends" />
        <ConfigButton
          onClick={() => runInAction(() => (config.rotation = (config.rotation + 1) % 4))}
          label="Rotate chessboard"
          icon={<MdRotateRight />}
        />
      </div>
    );
  }
);
