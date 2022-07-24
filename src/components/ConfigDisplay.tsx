import React from 'react';
import { Config } from '../data/config';
import { Checkbox } from '@material-tailwind/react';
import { RotateRight } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { ConfigButton } from './StyledWidgets';

export const ConfigDisplay = observer(({ config }: { config: Config }) => {
  /*
    const themeNames = themes.map(x => x.name);
    const setTheme = (name: string) => (config.theme = themeNames.indexOf(name));
          <div>
          <ConfigSelector
            label="Theme"
            choices={themeNames}
            selected={{ name: themeNames[config.theme], value: themeNames[config.theme] }}
            setSelected={setTheme}
          />
        </div>
  
       */
  return (
    <div className="flex flex-col text-center w-px-650 h-px-400 [&>div]:text-left">
      <div>
        <Checkbox
          name="1"
          checked={config.showFacts}
          onChange={() => (config.showFacts = !config.showFacts)}
        />
        <label htmlFor="1">Show openings information</label>
      </div>
      <div>
        <Checkbox
          name="2"
          checked={config.showHints}
          onChange={() => (config.showHints = !config.showHints)}
        />
        <label htmlFor="2">Training mode / Stockfish suggestions</label>
      </div>
      <div>
        <Checkbox
          name="3"
          checked={config.showCP}
          onChange={() => (config.showCP = !config.showCP)}
        />
        <label htmlFor="3">Training mode / Stockfish suggestions</label>
      </div>
      <div>
        <Checkbox
          name="4"
          checked={config.playCorrect}
          onChange={() => (config.playCorrect = !config.playCorrect)}
        />
        <label htmlFor="4">Play giphy for correct moves</label>
      </div>
      <div>
        <Checkbox
          name="5"
          checked={config.playMistake}
          onChange={() => (config.playMistake = !config.playMistake)}
        />
        <label htmlFor="5">Play giphy for big mistake</label>
      </div>
      <div>
        <Checkbox
          name="6"
          checked={config.playWinner}
          onChange={() => (config.playWinner = !config.playWinner)}
        />
        <label htmlFor="6">Play giphy for correct moves</label>
      </div>
      <div>
        <ConfigButton onClick={() => (config.rotation = (config.rotation + 1) % 4)}>
          Rotate chessboard <RotateRight />
        </ConfigButton>
      </div>
    </div>
  );
});
