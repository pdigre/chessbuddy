import React, { useState } from 'react';
import { Bot, UCI_ENGINES } from '../data/bots';
import { addPlayer, delPlayer, toString } from '../data/players';
import { usePersistentState } from '../data/state';
import styles from '../styles.module.scss';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { ConfigSelector } from './ConfigSelector';
import type { HANDLE_CHANGE, HANDLE_CLICK } from './reacttypes';
import { Player } from '../data/player';

export type ConfigBotProps = {
  players: Player[];
};

export const ConfigBot: React.FC<ConfigBotProps> = ({ players }) => {
  const [engine, setEngine] = React.useState('');
  const [skill, setSkill] = useState('20');
  const [depth, setDepth] = useState('10');
  const [time, setTime] = useState('');
  const [playerdata, setPlayerdata] = usePersistentState('playerdata', '');
  const addPlayerHandler: HANDLE_CLICK = event => {
    addPlayer(`Bot:${engine}:${skill}:${time}:${depth}`);
    setPlayerdata(toString());
  };
  const engineNames = Array.from(UCI_ENGINES.map(x => x.name));
  const skillChange: HANDLE_CHANGE = (event, child) => setSkill(event.target.value as string);
  const timeChange: HANDLE_CHANGE = (event, child) => setTime(event.target.value as string);
  const depthChange: HANDLE_CHANGE = (event, child) => setDepth(event.target.value as string);

  const [marker, setMarker] = useState(-1);
  const selectHandler: HANDLE_CLICK = event => {
    if (event.target instanceof HTMLTableCellElement) {
      const id = (event.target.parentNode as HTMLTableRowElement).id;
      const num = Number.parseInt(id);
      setMarker(num == marker ? -1 : num);
    }
  };

  const bots = players.filter(x => x instanceof Bot);
  const delPlayerHandler: HANDLE_CLICK = event => {
    if (marker >= 0) {
      delPlayer(bots[marker].name);
      setPlayerdata(toString());
    }
  };

  return (
    <div className={styles.Config}>
      <TableContainer className={styles.ConfigTableContainer}>
        <Table size="small" className={styles.ConfigTable}>
          <TableBody onClick={selectHandler}>
            {bots.map((bot, iLine) => (
              <TableRow key={iLine} id={iLine} className={iLine == marker ? styles.MarkRow : ''}>
                <TableCell>{bot.name}</TableCell>
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>
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
        <Button className={styles.Button} onClick={delPlayerHandler} aria-label="list" value="Play">
          Delete <Delete />
        </Button>
      </div>
    </div>
  );
};
