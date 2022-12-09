import React from 'react';
import { Config } from '../../model/config';
import { observer } from 'mobx-react';
import { ConfigButton, ConfigCheckbox } from './ConfigWidgets';
import { Theme } from '../../services/control/theme';
import { MdRotateRight } from 'react-icons/md';
import { runInAction } from 'mobx';

export const ConfigDisplay = observer(({ config, theme }: { config: Config; theme: Theme }) => {
  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <ConfigCheckbox
        checked={theme.darkTheme}
        onChange={() => (theme.darkTheme = !theme.darkTheme)}
        label="Use dark theme"
      />
      <ConfigCheckbox
        checked={config.showFacts}
        onChange={() =>
          runInAction(() => {
            config.showFacts = !config.showFacts;
          })
        }
        label="Show openings information"
      />
      <ConfigCheckbox
        checked={config.showHints}
        onChange={() =>
          runInAction(() => {
            config.showHints = !config.showHints;
          })
        }
        label="Training mode / Stockfish suggestions"
      />
      <ConfigCheckbox
        checked={config.showCP}
        onChange={() =>
          runInAction(() => {
            config.showCP = !config.showCP;
          })
        }
        label="Show CP - CentiPawns estimate"
      />
      <ConfigCheckbox
        checked={config.playCorrect}
        onChange={() =>
          runInAction(() => {
            config.playCorrect = !config.playCorrect;
          })
        }
        label="Play giphy for correct moves"
      />
      <ConfigCheckbox
        checked={config.playMistake}
        onChange={() =>
          runInAction(() => {
            config.playMistake = !config.playMistake;
          })
        }
        label="Play giphy for big mistake"
      />
      <ConfigCheckbox
        checked={config.playWinner}
        onChange={() =>
          runInAction(() => {
            config.playWinner = !config.playWinner;
          })
        }
        label="Play giphy when game ends"
      />
      <ConfigButton
        onClick={() =>
          runInAction(() => {
            config.rotation = (config.rotation + 1) % 4;
          })
        }
        label="Rotate chessboard"
        icon={<MdRotateRight />}
      />
    </div>
  );
});
