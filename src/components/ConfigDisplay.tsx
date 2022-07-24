import React from 'react';
import { Config } from '../logic/config';
import styles from '../styles.module.scss';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { RotateRight } from '@mui/icons-material';
import { observer } from 'mobx-react';

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
    <div className={styles.Config}>
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
        <Button
          className={styles.Button}
          sx={{ backgroundColor: 'darkgreen' }}
          variant="contained"
          onClick={() => (config.rotation = (config.rotation + 1) % 4)}>
          Rotate chessboard <RotateRight />
        </Button>
      </div>
    </div>
  );
});
