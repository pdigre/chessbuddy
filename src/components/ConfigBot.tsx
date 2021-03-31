import React from 'react';
import { ConfigSelector } from './ConfigSelector';
import styles from '../styles.module.scss';
import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import { Add } from '@material-ui/icons';
import { UCI_ENGINES } from '../data/bots';
import { addPlayer, toString } from '../data/players';
import type { HANDLE_CHANGE, HANDLE_CLICK } from './reacttypes';
import { useLocalStorage } from '../data/localstorage';

export const ConfigBot: React.FC = () => {
  const [engine, setEngine] = React.useState('');
  const [skill, setSkill] = useState('20');
  const [depth, setDepth] = useState('10');
  const [time, setTime] = useState('');
  const [playerdata, setPlayerdata] = useLocalStorage('playerdata', '');
  const addPlayerHandler: HANDLE_CLICK = event => {
    addPlayer(`Bot:${engine}:${skill}:${time}:${depth}`);
    setPlayerdata(toString());
  };
  const engineNames = Array.from(UCI_ENGINES.map(x => x.name));
  const skillChange: HANDLE_CHANGE = (event, child) => setSkill(event.target.value as string);
  const timeChange: HANDLE_CHANGE = (event, child) => setTime(event.target.value as string);
  const depthChange: HANDLE_CHANGE = (event, child) => setDepth(event.target.value as string);

  return (
    <div className={styles.Config}>
      <ConfigSelector
        label="Chess Engine"
        choices={engineNames}
        selected={engine}
        setSelected={setEngine}
      />
      <TextField label="Skill level" id="skill" size="small" onChange={skillChange} />
      <TextField
        label="Depth (leave empty to use time)"
        id="depth"
        size="small"
        onChange={depthChange}
      />
      <TextField label="Time (seconds)" id="time" size="small" onChange={timeChange} />
      <div className={styles.Buttons}>
        <Button className={styles.Button} onClick={addPlayerHandler} aria-label="list" value="Add">
          Add
          <Add />
        </Button>
      </div>
    </div>
  );
};
