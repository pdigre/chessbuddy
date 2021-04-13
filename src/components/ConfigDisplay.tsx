import React from 'react';
import { useGlobalState } from '../data/state';
import styles from '../styles.module.scss';
import { Button } from '@material-ui/core';
import { RotateRight } from '@material-ui/icons';

export const ConfigDisplay: React.FC = () => {
  const [rotation, setRotation] = useGlobalState('rotation');

  return (
    <div className={styles.Config}>
      <div className={styles.Buttons}>
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
