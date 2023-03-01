import React from 'react';
import { ConfigService } from '../service/config.service';
import { observer } from 'mobx-react';
import { ConfigBoolean, ConfigButton } from './ConfigWidgets';
import { RenderingService } from '../service/rendering.service';
import { MdRotateRight } from 'react-icons/md';
import { action } from 'mobx';

export const ConfigDisplay = observer(
  ({ config }: { config: ConfigService; rendering: RenderingService }) => {
    const props = config.boolprops;
    return (
      <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
        <ConfigBoolean props={props} id="darkTheme" label="Use dark theme" />
        <ConfigBoolean props={props} id="showFacts" label="Show openings information" />
        <ConfigBoolean props={props} id="showHints" label="Training mode / Stockfish suggestions" />
        <ConfigBoolean props={props} id="showCP" label="Show CP - CentiPawns estimate" />
        <ConfigBoolean props={props} id="playCorrect" label="Play giphy for correct moves" />
        <ConfigBoolean props={props} id="playMistake" label="Play giphy for big mistake" />
        <ConfigBoolean props={props} id="playWinner" label="Play giphy when game ends" />
        <ConfigButton
          onClick={action(config.rotateAction)}
          label="Rotate chessboard"
          icon={<MdRotateRight />}
        />
      </div>
    );
  }
);
