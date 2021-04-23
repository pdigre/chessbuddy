import React from 'react';
import { useGlobalState } from '../data/state';
import styles from '../styles.module.scss';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { RotateRight } from '@material-ui/icons';

export const ConfigDisplay: React.FC = () => {
  const [rotation, setRotation] = useGlobalState('rotation');
  const [showHints, setShowHints] = useGlobalState('showHints');
  const [showFacts, setShowFacts] = useGlobalState('showFacts');

  return (
    <div className={styles.Config}>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={showFacts}
              onChange={() => setShowFacts(!showFacts)}
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
              checked={showHints}
              onChange={() => setShowHints(!showHints)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Training mode / Stockfish suggestions"
        />
      </div>
      <div>
        <Button
          className={styles.Button}
          variant="contained"
          onClick={() => setRotation((rotation + 1) % 4)}>
          Rotate chessboard <RotateRight />
        </Button>
      </div>
    </div>
  );
};
