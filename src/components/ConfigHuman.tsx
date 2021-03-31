import React from 'react';
import styles from '../styles.module.scss';
import { Button, TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useState } from 'react';
import { addPlayer, toString } from '../data/players';
import type { HANDLE_CHANGE, HANDLE_CLICK } from './reacttypes';
import { useLocalStorage } from '../data/localstorage';

export const ConfigHuman: React.FC = () => {
  const [name, setName] = useState('');
  const [playerdata, setPlayerdata] = useLocalStorage('playerdata', '');
  const addPlayerHandler: HANDLE_CLICK = event => {
    addPlayer(`Human:${name}`);
    const plrs = toString();
    setPlayerdata(plrs);
  };
  const handleChange: HANDLE_CHANGE = (event, child) => setName(event.target.value as string);

  return (
    <div className={styles.Config}>
      <TextField label="Player Name" id="name" size="small" onChange={handleChange} />
      <div className={styles.Buttons}>
        <Button className={styles.Button} onClick={addPlayerHandler} aria-label="list" value="Play">
          Add <Add />
        </Button>
      </div>
    </div>
  );
};
