import React from 'react';
import { Config } from '../data/config';
import styles from '../styles.module.scss';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { RotateRight } from '@material-ui/icons';
import { observer } from 'mobx-react';

export const ConfigDisplay = observer(({ config }: { config: Config }) => {
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
        <Button
          className={styles.Button}
          variant="contained"
          onClick={() => (config.rotation = (config.rotation + 1) % 4)}>
          Rotate chessboard <RotateRight />
        </Button>
      </div>
    </div>
  );
});
