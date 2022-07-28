import React from 'react';
import { Config } from '../logic/config';
import { Checkbox, FormControlLabel } from '@mui/material';
import { RotateRight } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { ConfigButton } from './StyledSelector';

export const ConfigDisplay = observer(({ config }: { config: Config }) => {
  return (
    <div className="flex flex-col text-center w-[650px] h-[400px] [&>div]:text-left">
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={config.showFacts}
              onChange={() => (config.showFacts = !config.showFacts)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Show openings information"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={config.showHints}
              onChange={() => (config.showHints = !config.showHints)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Training mode / Stockfish suggestions"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={config.showCP}
              onChange={() => (config.showCP = !config.showCP)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Show CP - CentiPawns estimate"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={config.playCorrect}
              onChange={() => (config.playCorrect = !config.playCorrect)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Play giphy for correct moves"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={config.playMistake}
              onChange={() => (config.playMistake = !config.playMistake)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Play giphy for big mistake"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={config.playWinner}
              onChange={() => (config.playWinner = !config.playWinner)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Play giphy when game ends"
        />
      </div>
      <div>
        <ConfigButton onClick={() => (config.rotation = (config.rotation + 1) % 4)}>
          Rotate chessboard <RotateRight />
        </ConfigButton>
      </div>
    </div>
  );
});
