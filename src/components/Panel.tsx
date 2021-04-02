import React from 'react';
import { ButtonGroup } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import { PlayArrow, Pause, Settings, Timeline, RotateRight } from '@material-ui/icons';
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
      <Button className={styles.Button} onClick={stopstart}>
        {isPlaying ? <PlayArrow /> : <Pause />}
      </Button>
      <Button className={styles.Button} onClick={statsHandler}>
        <Timeline />
      </Button>
      <Button
        className={styles.Button}
        onClick={() => {
          setShowConfig(true);
          if (isPlaying) stopstart();
        }}>
        <Settings />
      </Button>
    </ButtonGroup>
  );
};
