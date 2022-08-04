import React from 'react';
import { Config } from '../logic/config';
import { observer } from 'mobx-react';
import { ConfigButton, ConfigCheckbox } from './ConfigWidgets';
import { Theme } from '../logic/theme';
import { MdRotateRight } from 'react-icons/md';

export const ConfigDisplay = observer(({ config, theme }: { config: Config; theme: Theme }) => {
  return (
    <div className="flex flex-col text-center w-[950px] h-[500px] [&>div]:text-left">
      <div>
        <ConfigCheckbox
          checked={theme.darkTheme}
          onChange={() => (theme.darkTheme = !theme.darkTheme)}
          label="Use dark theme"
        />
      </div>
      <div>
        <ConfigCheckbox
          checked={config.showFacts}
          onChange={() => (config.showFacts = !config.showFacts)}
          label="Show openings information"
        />
      </div>
      <div>
        <ConfigCheckbox
          checked={config.showHints}
          onChange={() => (config.showHints = !config.showHints)}
          label="Training mode / Stockfish suggestions"
        />
      </div>
      <div>
        <ConfigCheckbox
          checked={config.showCP}
          onChange={() => (config.showCP = !config.showCP)}
          label="Show CP - CentiPawns estimate"
        />
      </div>
      <div>
        <ConfigCheckbox
          checked={config.playCorrect}
          onChange={() => (config.playCorrect = !config.playCorrect)}
          label="Play giphy for correct moves"
        />
      </div>
      <div>
        <ConfigCheckbox
          checked={config.playMistake}
          onChange={() => (config.playMistake = !config.playMistake)}
          label="Play giphy for big mistake"
        />
      </div>
      <div>
        <ConfigCheckbox
          checked={config.playWinner}
          onChange={() => (config.playWinner = !config.playWinner)}
          label="Play giphy when game ends"
        />
      </div>
      <div>
        <ConfigButton
          onClick={() => (config.rotation = (config.rotation + 1) % 4)}
          label="Rotate chessboard"
          icon={<MdRotateRight />}
        />
      </div>
    </div>
  );
});
