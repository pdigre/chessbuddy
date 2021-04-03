import React from 'react';
import { ButtonGroup } from '@material-ui/core';
import { PlayArrow, Pause, Settings, Timeline, EventNote } from '@material-ui/icons';
import styles from '../styles.module.scss';
import { useGlobalState } from '../data/state';
import { Button } from '@material-ui/core';

export const Panel: React.FC<{ stopstart: () => void }> = ({ stopstart }) => {
  const [isPlaying, setPlaying] = useGlobalState('playing');
  const [showConfig, setShowConfig] = useGlobalState('showConfig');
  const [showStats, setShowStats] = useGlobalState('showStats');

  const statsHandler = () => setShowStats(!showStats);

  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      className={styles.Panel}>
      <Button className={styles.Button} onClick={stopstart} variant="contained">
        {isPlaying ? <PlayArrow /> : <Pause />}
      </Button>
      <Button className={styles.Button} onClick={statsHandler} variant="contained">
        {showStats ? <Timeline /> : <EventNote />}
      </Button>
      <Button
        className={styles.Button}
        onClick={() => {
          setShowConfig(true);
          if (isPlaying) stopstart();
        }}
        variant="contained">
        <Settings />
      </Button>
    </ButtonGroup>
  );
};
